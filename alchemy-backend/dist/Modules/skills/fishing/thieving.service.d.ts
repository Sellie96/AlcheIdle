import { UsersService } from 'src/user/users.service';
import { Thieving } from './entities/thieving.entity';
export declare class ThievingService {
    private usersService;
    thievingUsers: Thieving[];
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToThievingActive(activeThief: Thieving): Promise<any>;
    removeThievingUser(username: string): Thieving[];
    getThievingUsers(): Thieving[];
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
}
