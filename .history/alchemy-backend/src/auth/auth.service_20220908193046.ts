import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && user.password === password) {
            return user;
        }

        return null;
    
    }

    async login(user: any) {
        const payload = { username: user.username, password: user.password };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
