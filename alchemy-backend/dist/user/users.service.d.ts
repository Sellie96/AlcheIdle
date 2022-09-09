import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterData } from './register.interface';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    updateOneByUsername(username: string): Promise<void>;
    remove(id: string): Promise<void>;
    doesUserExist(username: string): Promise<boolean>;
    register(registerData: RegisterData): Promise<User>;
}
