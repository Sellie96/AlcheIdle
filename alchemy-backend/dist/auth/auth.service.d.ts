import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        userData: import("../user/user.entity").User;
        message: string;
    }>;
}
