import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService, MessagesGateway],
})

export class MessagesModule {}