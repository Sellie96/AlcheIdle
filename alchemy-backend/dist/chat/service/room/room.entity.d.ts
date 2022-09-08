import { JoinedRoomEntity } from "src/chat/model/joined-room/joined-room.entity";
import { MessageEntity } from "src/chat/model/message/message.entity";
import { UserEntity } from "src/user/model/user.entity";
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
