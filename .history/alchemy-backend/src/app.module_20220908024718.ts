import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages/messages.service';
import { MessagesGateway } from './messages/messages.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://GAMEADMIN:Ikdx9139@cluster0.ty5ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      synchronize: true,
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
