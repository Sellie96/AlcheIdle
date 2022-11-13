import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/users.service';
import { User } from 'src/user/user.entity';
import { ThievingService } from './thieving.service';
import { ThievingDto } from './dto/thieving.dto';
export declare class ThievingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly thievingService;
    private authService;
    private usersService;
    server: Server;
    users: number;
    sendResponse: boolean;
    constructor(thievingService: ThievingService, authService: AuthService, usersService: UsersService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    create(thieving: ThievingDto, client: Socket): Promise<void>;
    getPlayerData(playerData: User, client: Socket): Promise<void>;
}
