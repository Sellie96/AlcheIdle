import { UserEntity } from "src/user/model/user.entity";
import { RoomEntity } from "../room/room.entity";
export declare class MessageEntity {
    id: number;
    text: string;
    user: UserEntity;
    room: RoomEntity;
    created_at: Date;
    updated_at: Date;
}
