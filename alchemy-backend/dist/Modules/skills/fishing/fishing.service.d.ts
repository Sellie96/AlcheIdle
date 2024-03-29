import { UsersService } from 'src/user/users.service';
import { Fishing } from './entities/fishing.entity';
export declare class FishingService {
    private usersService;
    fishingUsers: Fishing[];
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToActive(activeFish: Fishing): Promise<any>;
}
