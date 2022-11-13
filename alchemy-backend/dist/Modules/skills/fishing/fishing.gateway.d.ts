import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/users.service';
import { User } from 'src/user/user.entity';
import { FishingService } from './fishing.service';
import { FishingDto } from './dto/fishing.dto';
export declare class FishingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly fishingService;
    private authService;
    private usersService;
    server: Server;
    users: number;
    sendResponse: boolean;
    constructor(fishingService: FishingService, authService: AuthService, usersService: UsersService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    create(fishing: FishingDto, client: Socket): Promise<void>;
    getPlayerData(playerData: User, client: Socket): Promise<void>;
}
