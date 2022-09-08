import { CreateUserDto } from 'src/user/model/dto/create-user.dto';
import { LoginUserDto } from 'src/user/model/dto/login-user.dto';
import { UserI } from 'src/user/model/user.interface';
export declare class UserHelperService {
    createUserDtoToEntity(createUserDto: CreateUserDto): UserI;
    loginUserDtoToEntity(loginUserDto: LoginUserDto): UserI;
}
