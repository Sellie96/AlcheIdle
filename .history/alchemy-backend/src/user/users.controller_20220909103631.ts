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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
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
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Post()
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Res() res,    @Body() createUser: RegisterData): Promise<User> {
    if(await this.usersService.doesUserExist(createUser.username)) {
      return res.status(403).send({message: 'User already exists'});
    } else {
      return this.usersService.register(createUser);
    }
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
