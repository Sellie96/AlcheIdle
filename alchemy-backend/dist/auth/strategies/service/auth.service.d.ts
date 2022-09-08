import { JwtService } from '@nestjs/jwt';
import { UserI } from 'src/user/model/user.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJwt(user: UserI): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, storedPasswordHash: string): Promise<any>;
    verifyJwt(jwt: string): Promise<any>;
}
