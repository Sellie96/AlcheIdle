import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { RoomEntity } from 'src/chat/model/room/room.entity';
import { RoomI } from 'src/chat/model/room/room.interface';
import { UserI } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
export declare class RoomService {
    private readonly roomRepository;
    constructor(roomRepository: Repository<RoomEntity>);
    createRoom(room: RoomI, creator: UserI): Promise<RoomI>;
    getRoom(roomId: number): Promise<RoomI>;
    getRoomsForUser(userId: number, options: IPaginationOptions): Promise<Pagination<RoomI>>;
    addCreatorToRoom(room: RoomI, creator: UserI): Promise<RoomI>;
}
