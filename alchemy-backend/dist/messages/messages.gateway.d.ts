import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesService;
    server: Server;
    users: number;
    constructor(messagesService: MessagesService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(): Promise<void>;
    create(createMessageDto: CreateMessageDto): Promise<void>;
    findAll(client: Socket): void;
    update(updateMessageDto: UpdateMessageDto): string;
    typing(isTyping: boolean, client: Socket): Promise<void>;
}
