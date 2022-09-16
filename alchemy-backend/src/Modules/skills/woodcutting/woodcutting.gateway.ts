import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WoodcuttingService } from './woodcutting.service';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { WoodcuttingDto } from './dto/woodcutting.dto';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/users.service';
import { User } from 'src/user/user.entity';

@WebSocketGateway({ cors: true })
export class WoodcuttingGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  users: number = 0;

  constructor(
    private readonly woodCuttingService: WoodcuttingService,
    private authService: AuthService,
    private usersService: UsersService
    ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
      const user =  await this.usersService.findOneByUsername(decodedToken.username);
      if(!user) {
        //disconnect user
        client.disconnect();
      } else {
        console.log('user connected');
        let users = this.woodCuttingService.getWoodcuttingUsers();
        this.server.emit('woodcuttingUsers', users.length);
        this.getPlayerData(user, client);
      }
    } catch {
      console.log('woodcutting connect error');
    }
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
      console.log(decodedToken);
      const user =  await this.usersService.findOneByUsername(decodedToken.username);
      if(!user) {
        //disconnect user
        client.disconnect();
      } else {

        console.log('user disconnected');
        let users = this.woodCuttingService.removeWoodcuttingUser(user.username);
        this.server.emit('woodcuttingUsers', users.length);
      }
    } catch {
      console.log('woodcutting disconnect error');
    }
  }

  @SubscribeMessage('woodcuttingActive')
  async create(@MessageBody() woodcutting: WoodcuttingDto) {
    let users = this.woodCuttingService.addToWoodcuttingActive({username: woodcutting.username, treeType: woodcutting.treeType, jwt: woodcutting.jwt});
    this.server.emit('woodcuttingUsers', users.length);
  }

  @SubscribeMessage('getWoodcuttingPlayerData')
  async getPlayerData(@MessageBody() playerData: User, @ConnectedSocket() client: Socket) {
    this.server.to(client.id).emit('getWoodcuttingPlayerData', playerData);
  }
}
