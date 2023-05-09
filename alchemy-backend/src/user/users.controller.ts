import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Res,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/strategies/local-auth.guard';

import { RegisterData } from './register.interface';
import { User } from './user.entity';
import { UsersService } from './users.service';

const skills = [
  'woodcutting',
  'firemaking',
  'fishing',
  'cooking',
  'runecrafting',
  'mining',
  'smithing',
  'thieving',
  'fletching',
  'crafting',
  'herblore',
  'agility'
];

@ApiBearerAuth()
@ApiTags('Alchemy')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({
    status: 200,
    description: 'User Registered',
  })
  async registerUser(@Res() res, @Body() createUser: RegisterData): Promise<User> {
    if (await this.usersService.doesUserExist(createUser.username)) {
      return res.status(HttpStatus.FORBIDDEN).send({ message: 'User already exists' });
    }
  
    this.usersService.register(createUser);
    return res.status(HttpStatus.OK).send({ message: 'User registered' });
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get player data' })
  @ApiResponse({
    status: 200,
    description: 'User Returned',
  })
  async getPlayerData(@Res() res, @Body('username') username: string): Promise<User> {
    try {
      const playerData = await this.usersService.findOneByUsername(username);
      return res.status(200).send({ playerData });
    } catch (error) {
      return res.status(500).send({ error: 'Failed to retrieve player data' });
    }
  }

  @Get('leaderboard')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of users',
    type: User,
  })
  async getLeaderboard(
    @Res() res,
    @Query('skill') skill: string,
  ): Promise<User> {
    // Validate the skill query parameter
    if (!skill || (!skills.includes(skill.toLowerCase()) && skill !== 'all')) {
      return res.status(400).send({ error: 'Invalid skill specified' });
    }
  
    const returnedData = await this.usersService.findAll();

  
    // Add a ranking property to each user object based on their skill level
  
    // Return only the CharacterName, characterAlignment, Skill Total level and skill total xp properties of each user object
    let leaderboardData;

    console.log(skill);

    if(skill === 'all') {
      leaderboardData = returnedData.map((obj, index) => ({
        name: obj.character.characterName,
        mode: obj.character.characterAlignment,
        level: obj.character.combatStats.progression.level,
        xp: obj.character.combatStats.progression.experiencePoints,
      }));
    } else {
      leaderboardData = returnedData.map((obj, index) => ({
        name: obj.character.characterName,
        mode: obj.character.characterAlignment,
        level: this.getLevel(obj.character.skills, skill),
        xp: this.getXp(obj.character.skills, skill),
      }));
    }

    leaderboardData = leaderboardData.sort((a, b) => b.level - a.level).map((obj, index) => ({  ...obj, ranking: index + 1 }));
  
    return res.status(200).send({ playerData: leaderboardData });
  }

  private getTotalLevel(returnedData: any) {
    let totalLevel: number = 0;

    skills.forEach(value => {
      totalLevel += returnedData[value].level
    })

    return totalLevel;
  }

  private getTotalXp(returnedData: any) {
    let totalXp: number = 0;

    skills.forEach(value => {
      totalXp += returnedData[value].xpCurrent
    })

    return totalXp;
  }

  private getLevel(returnedData: any, skill: string) {
    let totalLevel: number = 0;
    totalLevel += returnedData[skill.toLowerCase()].level


    return totalLevel;
  }

  private getXp(returnedData: any, skill: string) {
    let totalXp: number = 0;
    totalXp += returnedData[skill.toLowerCase()].xpCurrent
    return totalXp;
  }

  filterTotalLevel(returnedData: any[], skills: any[]) {
    return returnedData.sort((a: { character: { skills: { [x: string]: { level: any; }; }; }; }, b: { character: { skills: { [x: string]: { level: any; }; }; }; }) => {
      const aTotalLevel = skills.reduce((total: any, skill: string | number) => {
        return total + a.character.skills[skill].level;
      }, 0);
  
      const bTotalLevel = skills.reduce((total: any, skill: string | number) => {
        return total + b.character.skills[skill].level;
      }, 0);
  
      return bTotalLevel - aTotalLevel;
    });
  }

  filterSkillLevel(returnedData: any[], skill: string | number) {
    return returnedData.sort(function (
      a: { character: { skills: { [x: string]: { level: number } } } },
      b: { character: { skills: { [x: string]: { level: number } } } },
    ) {
      return b.character.skills[skill].level - a.character.skills[skill].level;
    });
  }


  flatten(arr: any[]): any[] {
    const flattenedArray: any[] = [];
    for (const element of arr) {
      if (Array.isArray(element)) {
        flattenedArray.push(...this.flatten(element));
      } else {
        flattenedArray.push(element);
      }
    }
    return flattenedArray;
  }
}
