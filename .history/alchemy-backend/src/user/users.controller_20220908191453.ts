import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Alchemy')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}


 @UseGuards(LocalAuthGuard)
 @Post('login')
 login(@Request() req): any {
    console.log(req.user);
    return this.authService.login(req.user);
 }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUser: User): Promise<User> {
    return this.usersService.create();
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