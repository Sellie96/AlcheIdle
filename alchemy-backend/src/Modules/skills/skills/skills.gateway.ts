import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { MessagesService } from 'src/Modules/messages/messages.service';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/users.service';
import { AgilityService } from '../agility/agility.service';
import { FishingService } from '../fishing/fishing.service';
import { MiningService } from '../mining/mining.service';
import { ThievingService } from '../thieving/thieving.service';
import { WoodcuttingService } from '../woodcutting/woodcutting.service';
import { SkillingDto } from './skill.dto';

@WebSocketGateway({ cors: true })
export class SkillsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  users: number = 0;
  sendResponse: boolean = true;

  constructor(
    private readonly miningService: MiningService,
    private readonly agilityService: AgilityService,
    private readonly fishingService: FishingService,
    private readonly woodcuttingService: WoodcuttingService,
    private readonly thievingService: ThievingService,
    private authService: AuthService,
    private usersService: UsersService,
    private messagesService: MessagesService
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
        this.getPlayerData(user, client);
      }
    } catch {
      console.log('skilling connect error');
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
        client.disconnect();
      }
    } catch {
      console.log('skilling disconnect error');
    }
  }

  @SubscribeMessage('skillingActive')
  async create(@MessageBody() skilling: SkillingDto, @ConnectedSocket() client: Socket) {
    let returnSkillingData;
    switch(skilling.type.skillType) {
        case 'mining':
            returnSkillingData = await this.miningService.addToMiningActive({username: skilling.username, oreType: skilling.type, jwt: skilling.jwt, timestamp: skilling.timestamp});
            break;
        case 'agility':
            returnSkillingData = await this.agilityService.addToAgilityActive({username: skilling.username, courseType: skilling.type, jwt: skilling.jwt, timestamp: skilling.timestamp});
            break;
        case 'fishing':
            returnSkillingData = await this.fishingService.addToFishingActive({username: skilling.username, fishType: skilling.type, jwt: skilling.jwt, timestamp: skilling.timestamp});
            break;
        case 'woodcutting':
            returnSkillingData = await this.woodcuttingService.addToWoodcuttingActive({username: skilling.username, treeType: skilling.type, jwt: skilling.jwt, timestamp: skilling.timestamp});
            break;
        case 'thieving':  
            returnSkillingData = await this.thievingService.addToThievingActive({username: skilling.username, thievingOption: skilling.type, jwt: skilling.jwt, timestamp: skilling.timestamp});
            break;
        default: console.log('error in skills gateway');
    }
    this.server.to(client.id).emit('skillingActive', returnSkillingData);
  }

  @SubscribeMessage('getSkillingPlayerData')
  async getPlayerData(@MessageBody() playerData: User, @ConnectedSocket() client: Socket) {
    this.server.to(client.id).emit('getSkillingPlayerData', playerData);
  }
}