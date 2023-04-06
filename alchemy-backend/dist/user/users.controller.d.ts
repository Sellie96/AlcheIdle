import { AuthService } from 'src/auth/auth.service';
import { RegisterData } from './register.interface';
import { User } from './user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    login(req: any): any;
    registerUser(res: any, createUser: RegisterData): Promise<User>;
    getPlayerData(res: any, username: string): Promise<User>;
    getLeaderboard(res: any, skill: string): Promise<User>;
    private getTotalLevel;
    private getTotalXp;
    private getLevel;
    private getXp;
    filterTotalLevel(returnedData: any[], skills: any[]): any[];
    filterSkillLevel(returnedData: any[], skill: string | number): any[];
    flatten(arr: any[]): any[];
}
