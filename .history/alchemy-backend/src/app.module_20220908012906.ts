import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages/messages.service';
import { MessagesGateway } from './messages/messages.gateway';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://GAMEADMIN:Ikdx9139@cluster0.ty5ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      synchronize: true,
      useUnifiedTopology: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessagesGateway, MessagesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/api/users', method: RequestMethod.POST },
        { path: '/api/users/login', method: RequestMethod.POST },
      )
      .forRoutes('');
  }
}
