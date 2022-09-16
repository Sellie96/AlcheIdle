import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Res,
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
    description: 'User Registered'
  })
  async create(@Res() res,    @Body() createUser: RegisterData): Promise<User> {
    if(await this.usersService.doesUserExist(createUser.username)) {
      return res.status(403).send({message: 'User already exists'});
    } else {
       this.usersService.register(createUser);
       return res.status(200).send({message: 'User registered'});
    }
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get player data' })
  @ApiResponse({     
    status: 200,
    description: 'User Returned'
  })
  async getPlayerData(@Res() res,  @Body() body: any): Promise<User> {
    return res.status(200).send({playerData: await this.usersService.findOneByUsername(body.username)});
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }
}
