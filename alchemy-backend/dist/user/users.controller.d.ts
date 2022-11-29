import { AuthService } from 'src/auth/auth.service';
import { RegisterData } from './register.interface';
import { User } from './user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    login(req: any): any;
    create(res: any, createUser: RegisterData): Promise<User>;
    getPlayerData(res: any, body: any): Promise<User>;
    returnTotalLevelLeaderboard(res: any, skill: String): Promise<User>;
    filterTotalLevel(returnedData: any[]): any[];
    filterSkillLevel(returnedData: any, skill: any): any;
}
