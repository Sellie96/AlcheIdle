import { UserEntity } from "src/user/model/user.entity";
import { JoinedRoomEntity } from "../joined-room/joined-room.entity";
import { MessageEntity } from "../message/message.entity";
export declare class RoomEntity {
    id: number;
    name: string;
    description: string;
    users: UserEntity[];
    joinedUsers: JoinedRoomEntity[];
    messages: MessageEntity[];
    created_at: Date;
    updated_at: Date;
}
