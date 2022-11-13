import { UsersService } from 'src/user/users.service';
import { Agility } from './entities/message.entity';
export declare class AgilityService {
    private usersService;
    agilityUsers: Agility[];
    startAgility: boolean;
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToAgilityActive(activeRunner: Agility): Promise<any>;
}
