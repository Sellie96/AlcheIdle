import { Woodcutting } from './entities/message.entity';
import { UsersService } from 'src/user/users.service';
export declare class WoodcuttingService {
    private usersService;
    woodCuttingUsers: Map<string, Woodcutting>;
    startWoodcutting: boolean;
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToActive(activeWoodcutter: Woodcutting): Promise<any>;
}
