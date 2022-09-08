import { JoinedRoomEntity } from 'src/chat/model/joined-room/joined-room.entity';
import { JoinedRoomI } from 'src/chat/model/joined-room/joined-room.interface';
import { RoomI } from 'src/chat/model/room/room.interface';
import { UserI } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
export declare class JoinedRoomService {
    private readonly joinedRoomRepository;
    constructor(joinedRoomRepository: Repository<JoinedRoomEntity>);
    create(joinedRoom: JoinedRoomI): Promise<JoinedRoomI>;
    findByUser(user: UserI): Promise<JoinedRoomI[]>;
    findByRoom(room: RoomI): Promise<JoinedRoomI[]>;
    deleteBySocketId(socketId: string): Promise<import("typeorm").DeleteResult>;
    deleteAll(): Promise<void>;
}
