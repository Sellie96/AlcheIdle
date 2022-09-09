import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  login(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
