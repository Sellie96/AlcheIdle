import { UsersService } from 'src/user/users.service';
import { Mining } from './entities/message.entity';
export declare class MiningService {
    private usersService;
    miningUsers: Mining[];
    startMining: boolean;
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToMiningActive(activeMiner: Mining): Promise<any>;
    removeMiningUser(username: string): Mining[];
    getMiningUsers(): Mining[];
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
}
