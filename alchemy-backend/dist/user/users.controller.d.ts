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
    findOne(id: string): Promise<User>;
}
