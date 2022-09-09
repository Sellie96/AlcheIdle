import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WoodcuttingService } from './woodcutting.service';
import { Server, Socket } from 'socket.io';
import { WoodcuttingDto } from './dto/woodcutting.dto';
export declare class WoodcuttingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly woodCuttingService;
    server: Server;
    users: number;
    constructor(woodCuttingService: WoodcuttingService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(): Promise<void>;
    create(woodcutting: WoodcuttingDto): Promise<void>;
}
