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
  async create(@Res() res, @Body() createUser: RegisterData): Promise<User> {
    if (await this.usersService.doesUserExist(createUser.username)) {
      return res.status(403).send({ message: 'User already exists' });
    } else {
      this.usersService.register(createUser);
      return res.status(200).send({ message: 'User registered' });
    }
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get player data' })
  @ApiResponse({
    status: 200,
    description: 'User Returned',
  })
  async getPlayerData(@Res() res, @Body() body: any): Promise<User> {
    return res.status(200).send({
      playerData: await this.usersService.findOneByUsername(body.username),
    });
  }

  @Get('leaderboard')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of users',
    type: User,
  })
  async returnTotalLevelLeaderboard(
    @Res() res,
    @Query('skill') skill: String,
  ): Promise<User> {
    let returnedData: any = await this.usersService.findAll();

    let sortedObjs: any[];

    switch (skill.toLowerCase()) {
      case 'total':
        sortedObjs = this.filterTotalLevel(returnedData);
        break;
      default:
        sortedObjs = this.filterSkillLevel(returnedData, skill.toLowerCase());
        break;
    }

    return res.status(200).send({ playerData: sortedObjs });
  }

  filterTotalLevel(returnedData: any[]) {
   return returnedData.sort(function (a, b) {
      return (
        b.character.skills.woodcutting.level +
        b.character.skills.firemaking.level +
        b.character.skills.fishing.level +
        b.character.skills.cooking.level +
        b.character.skills.runecrafting.level +
        b.character.skills.mining.level +
        b.character.skills.smithing.level +
        b.character.skills.thieving.level +
        b.character.skills.fletching.level +
        b.character.skills.crafting.level +
        b.character.skills.herblore.level +
        b.character.skills.agility.level -
        (a.character.skills.woodcutting.level +
          a.character.skills.mining.level +
          a.character.skills.fishing.level +
          a.character.skills.cooking.level +
          a.character.skills.firemaking.level +
          a.character.skills.runecrafting.level +
          a.character.skills.smithing.level +
          a.character.skills.thieving.level +
          a.character.skills.fletching.level +
          a.character.skills.crafting.level +
          a.character.skills.herblore.level +
          a.character.skills.agility.level)
      );
    });
  }

  filterSkillLevel(returnedData, skill) {
   return returnedData.sort(function (a, b) {
      return b.character.skills[skill].level - a.character.skills[skill].level;
    });
  }
}
