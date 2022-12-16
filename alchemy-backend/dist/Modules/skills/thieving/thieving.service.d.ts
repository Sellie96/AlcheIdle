import { UsersService } from 'src/user/users.service';
import { Thieving } from './entities/thieving.entity';
export declare class ThievingService {
    private usersService;
    thievingUsers: Map<string, Thieving>;
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToActive(activeThief: Thieving): Promise<any>;
}
