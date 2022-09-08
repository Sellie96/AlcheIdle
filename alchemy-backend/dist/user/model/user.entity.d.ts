import { ConnectedUserEntity } from "src/chat/model/connected-user/connected-user.entity";
import { JoinedRoomEntity } from "src/chat/model/joined-room/joined-room.entity";
import { MessageEntity } from "src/chat/model/message/message.entity";
import { RoomEntity } from "src/chat/model/room/room.entity";
export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    rooms: RoomEntity[];
    connections: ConnectedUserEntity[];
    joinedRooms: JoinedRoomEntity[];
    messages: MessageEntity[];
    emailToLowerCase(): void;
}
