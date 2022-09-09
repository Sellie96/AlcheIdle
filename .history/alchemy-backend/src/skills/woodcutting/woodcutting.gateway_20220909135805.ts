import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WoodcuttingService } from './woodcutting.service';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { Woodcutting } from './entities/message.entity';

@WebSocketGateway({ cors: true })
export class WoodcuttingGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  users: number = 0;

  constructor(private readonly woodCuttingService: WoodcuttingService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    // A client has connected
    this.users++;

    const message: Woodcutting[] = this.woodCuttingService.findAll();

    this.server.emit('findAllMessages',  message);

    // Notify connected clients of current users
    this.server.emit('woodcuttingUsers', this.users);
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }
}
