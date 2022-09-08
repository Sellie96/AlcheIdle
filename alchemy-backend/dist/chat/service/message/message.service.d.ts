import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { MessageEntity } from 'src/chat/model/message/message.entity';
import { MessageI } from 'src/chat/model/message/message.interface';
import { RoomI } from 'src/chat/model/room/room.interface';
import { Repository } from 'typeorm';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<MessageEntity>);
    create(message: MessageI): Promise<MessageI>;
    findMessagesForRoom(room: RoomI, options: IPaginationOptions): Promise<Pagination<MessageI>>;
}
