import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user-input';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUsers(): Promise<User[]>;
    getUser(id: string): Promise<User>;
    createUser(createUserInput: CreateUserInput): Promise<User>;
    assignCharactersToUser(userId: string, characterIds: string[]): Promise<User>;
}
