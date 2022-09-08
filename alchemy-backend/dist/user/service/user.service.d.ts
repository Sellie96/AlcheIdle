import { AuthService } from 'src/auth/strategies/service/auth.service';
import { Repository } from 'typeorm/repository/Repository';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { UserI } from '../model/user.interface';
import { UserEntity } from '../model/user.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(newUser: UserI): Promise<UserI>;
    login(user: UserI): Promise<string>;
    findAll(options: IPaginationOptions): Promise<Pagination<UserI>>;
    findAllByUsername(username: string): Promise<UserI[]>;
    private findByEmail;
    private hashPassword;
    private validatePassword;
    private findOne;
    getOne(id: number): Promise<UserI>;
    private mailExists;
}
