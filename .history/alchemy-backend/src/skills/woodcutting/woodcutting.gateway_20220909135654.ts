import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './woodcutting.service';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WoodcuttingGateway implements OnGatewayConnection, OnGatewayDisconnect {

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
}
