import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { Message } from './entities/message.entity';

@WebSocketGateway({ cors: true })
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  users: number = 0;

  constructor(private readonly messagesService: MessagesService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    // A client has connected
    this.users++;

    const message: Message[] = this.messagesService.findAll();

    this.server.emit('findAllMessages',  message);

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {

    const message = await this.messagesService.create(createMessageDto);

    this.server.emit('findAllMessages', message);
  }

  @SubscribeMessage('')
  findAll(
    @ConnectedSocket() client: Socket) {
      const message = this.messagesService.findAll();

      client.broadcast.emit('findAllMessages', message);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket) {
    
      const name = this.messagesService.getClientName(client.id);

      client.broadcast.emit('typing', {name, isTyping});
  }



}
