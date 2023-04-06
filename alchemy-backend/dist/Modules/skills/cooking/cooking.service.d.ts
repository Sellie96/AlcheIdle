import { UsersService } from 'src/user/users.service';
import { Cooking } from './entities/cooking.entity';
export declare class CookingService {
    private usersService;
    cookingUsers: Cooking[];
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToActive(activeLog: Cooking): Promise<any>;
}
