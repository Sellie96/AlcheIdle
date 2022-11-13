import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/users.service';
import { AgilityService } from './agility.service';
import { AgilityDto } from './dto/agility.dto';
export declare class AgilityGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly agilityService;
    private authService;
    private usersService;
    server: Server;
    users: number;
    sendResponse: boolean;
    constructor(agilityService: AgilityService, authService: AuthService, usersService: UsersService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    create(agility: AgilityDto, client: Socket): Promise<void>;
    getPlayerData(playerData: User, client: Socket): Promise<void>;
}
