import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
export declare class MessagesService {
    private messages;
    private clientToUser;
    constructor();
    create(createMessageDto: CreateMessageDto): Message[];
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
    findAll(): Message[];
    findOne(id: number): string;
    update(id: number, updateMessageDto: UpdateMessageDto): string;
    remove(id: number): string;
}
