import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages/messages.service';
import { MessagesGateway } from './messages/messages.gateway';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { UsersModule } from './user/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [User],
      useUnifiedTopology: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
  AppService,
  MessagesGateway,
  MessagesService,
  JwtService
],
})
export class AppModule {}
