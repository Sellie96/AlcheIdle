import { UserEntity } from "src/user/model/user.entity";
export declare class ConnectedUserEntity {
    id: number;
    socketId: string;
    user: UserEntity;
}
