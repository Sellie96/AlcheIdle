import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
export declare class MessagesService {
    messages: Message[];
    clientToUser: {};
    create(createMessageDto: CreateMessageDto): Message[];
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
    findAll(): Message[];
    findOne(id: number): string;
    update(id: number, updateMessageDto: UpdateMessageDto): string;
    remove(id: number): string;
}
