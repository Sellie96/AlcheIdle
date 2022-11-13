import { Woodcutting } from './entities/message.entity';
import { UsersService } from 'src/user/users.service';
export declare class WoodcuttingService {
    private usersService;
    woodCuttingUsers: Woodcutting[];
    startWoodcutting: boolean;
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToWoodcuttingActive(activeWoodcutter: Woodcutting): Promise<any>;
}
