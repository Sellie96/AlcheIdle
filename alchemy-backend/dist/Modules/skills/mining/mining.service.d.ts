import { UsersService } from 'src/user/users.service';
import { Mining } from './entities/message.entity';
export declare class MiningService {
    private usersService;
    miningUsers: Mining[];
    startMining: boolean;
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToActive(activeMiner: Mining): Promise<any>;
}
