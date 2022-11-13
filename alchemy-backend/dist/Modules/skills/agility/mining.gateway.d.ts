import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/users.service';
import { MiningDto } from './dto/mining.dto';
import { MiningService } from './mining.service';
export declare class MiningGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly miningService;
    private authService;
    private usersService;
    server: Server;
    users: number;
    sendResponse: boolean;
    constructor(miningService: MiningService, authService: AuthService, usersService: UsersService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    create(mining: MiningDto, client: Socket): Promise<void>;
    getPlayerData(playerData: User, client: Socket): Promise<void>;
}
