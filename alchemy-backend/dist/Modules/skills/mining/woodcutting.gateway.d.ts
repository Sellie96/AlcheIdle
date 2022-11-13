import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WoodcuttingService } from './woodcutting.service';
import { Server, Socket } from 'socket.io';
import { WoodcuttingDto } from './dto/woodcutting.dto';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/users.service';
import { User } from 'src/user/user.entity';
export declare class WoodcuttingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly woodCuttingService;
    private authService;
    private usersService;
    server: Server;
    users: number;
    sendResponse: boolean;
    constructor(woodCuttingService: WoodcuttingService, authService: AuthService, usersService: UsersService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    create(woodcutting: WoodcuttingDto, client: Socket): Promise<void>;
    getPlayerData(playerData: User, client: Socket): Promise<void>;
}
