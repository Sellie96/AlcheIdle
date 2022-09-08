import { ConnectedUserEntity } from 'src/chat/model/connected-user/connected-user.entity';
import { ConnectedUserI } from 'src/chat/model/connected-user/connected-user.interface';
import { UserI } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
export declare class ConnectedUserService {
    private readonly connectedUserRepository;
    constructor(connectedUserRepository: Repository<ConnectedUserEntity>);
    create(connectedUser: ConnectedUserI): Promise<ConnectedUserI>;
    findByUser(user: UserI): Promise<ConnectedUserI[]>;
    deleteBySocketId(socketId: string): Promise<import("typeorm").DeleteResult>;
    deleteAll(): Promise<void>;
}
