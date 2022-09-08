import { UserHelperService } from "../service/user-helper.service";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../model/dto/create-user.dto";
import { UserI } from "../model/user.interface";
export declare class UserController {
    private userService;
    private userHelperService;
    constructor(userService: UserService, userHelperService: UserHelperService);
    create(createUserDto: CreateUserDto): Promise<UserI>;
    findAll(page?: number, limit?: number): Promise<Pagination<UserI>>;
    findByUsername(username: string): Promise<UserI[]>;
    login(loginUserDto: CreateUserDto): Promise<{
        access_token: string;
        token_type: string;
        expires_in: number;
    }>;
}
