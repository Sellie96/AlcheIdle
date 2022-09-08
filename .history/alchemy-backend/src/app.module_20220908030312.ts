import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages/messages.service';
import { MessagesGateway } from './messages/messages.gateway';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [User],
      useUnifiedTopology: true,
    })],
  controllers: [AppController],
  providers: [
  AppService,
  MessagesGateway,
  MessagesService
],
})
export class AppModule {}
