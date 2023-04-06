import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/users.service';
import { AgilityService } from '../agility/agility.service';
import { CookingService } from '../cooking/cooking.service';
import { FiremakingService } from '../firemaking/firemaking.service';
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
    private readonly firemakingService: FiremakingService,
    private readonly cookingService: CookingService,
    private authService: AuthService,
    private usersService: UsersService,
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
    const servicesMap = {
      mining: this.miningService,
      agility: this.agilityService,
      fishing: this.fishingService,
      woodcutting: this.woodcuttingService,
      thieving: this.thievingService,
      firemaking: this.firemakingService,
      cooking: this.cookingService,
    };
  
    const service = servicesMap[skilling.type.skillType];
  
    if (!service) {
      console.log('error in skills gateway');
      return;
    }
  
    const returnSkillingData = await service.addToActive({
      username: skilling.username,
      type: skilling.type,
      jwt: skilling.jwt,
      timestamp: skilling.timestamp,
    });
  
    this.server.to(client.id).emit('skillingActive', returnSkillingData);
  }

  @SubscribeMessage('getSkillingPlayerData')
  async getPlayerData(@MessageBody() playerData: User, @ConnectedSocket() client: Socket) {
    this.server.to(client.id).emit('getSkillingPlayerData', playerData);
  }
}