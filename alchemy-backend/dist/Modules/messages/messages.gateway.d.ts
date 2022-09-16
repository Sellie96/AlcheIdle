import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server } from 'socket.io';
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesService;
    server: Server;
    users: number;
    constructor(messagesService: MessagesService);
    handleConnection(): Promise<void>;
    handleDisconnect(): Promise<void>;
    create(createMessageDto: CreateMessageDto): Promise<void>;
    findAll(): void;
}
