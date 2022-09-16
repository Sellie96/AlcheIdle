import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { Message } from './entities/message.entity';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  users: number = 0;

  constructor(private readonly messagesService: MessagesService) {}

  async handleConnection() {
    this.users++;

    const message: Message[] = this.messagesService.findAll();

    this.server.emit('findAllMessages', message);
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    this.users--;
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    this.server.emit('findAllMessages', this.messagesService.create(createMessageDto));
  }

  @SubscribeMessage('')
  findAll() {
    this.server.emit('findAllMessages', this.messagesService.findAll());
  }
}
