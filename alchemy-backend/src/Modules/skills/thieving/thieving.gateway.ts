import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/users.service';
import { User } from 'src/user/user.entity';
import { ThievingService } from './thieving.service';
import { ThievingDto } from './dto/thieving.dto';

@WebSocketGateway({ cors: true })
export class ThievingGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  users: number = 0;
  sendResponse: boolean = true;

  constructor(
    private readonly thievingService: ThievingService,
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
        let users = this.thievingService.getThievingUsers();
        this.server.emit('thievingUsers', users.length);
        this.getPlayerData(user, client);
      }
    } catch {
      console.log('thieving connect error');
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
        let users = this.thievingService.removeThievingUser(user.username);
        this.server.emit('thievingUsers', users.length);
        client.disconnect();
      }
    } catch {
      console.log('thieving disconnect error');
    }
  }

  @SubscribeMessage('thievingActive')
  async create(@MessageBody() thieving: ThievingDto, @ConnectedSocket() client: Socket) {
    let returnThievingData = await this.thievingService.addToThievingActive({username: thieving.username, thievingOption: thieving.thievingOption, jwt: thieving.jwt, timestamp: thieving.timestamp});
    let users = this.thievingService.getThievingUsers();
    this.server.emit('thievingUsers', users.length);
    this.server.to(client.id).emit('thievingActive', returnThievingData);
  }

  @SubscribeMessage('getThievingPlayerData')
  async getPlayerData(@MessageBody() playerData: User, @ConnectedSocket() client: Socket) {
    this.server.to(client.id).emit('getThievingPlayerData', playerData);
  }
}
