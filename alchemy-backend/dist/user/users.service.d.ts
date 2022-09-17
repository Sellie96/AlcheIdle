import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterData } from './register.interface';
import { MessagesGateway } from 'src/Modules/messages/messages.gateway';
import { MessagesService } from 'src/Modules/messages/messages.service';
import { Woodcutting } from 'src/Modules/skills/woodcutting/entities/message.entity';
import { Thieving } from 'src/Modules/skills/thieving/entities/thieving.entity';
export declare class UsersService {
    private usersRepository;
    private messagesService;
    private messagesGateway;
    constructor(usersRepository: Repository<User>, messagesService: MessagesService, messagesGateway: MessagesGateway);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    updateWoodcuttingByUsername(woodcutter: Woodcutting): Promise<{
        user: User;
        logAmount: number;
    }>;
    shouldLevelup(user: User, skill: string): number;
    remove(id: string): Promise<void>;
    doesUserExist(username: string): Promise<boolean>;
    register(registerData: RegisterData): Promise<User>;
    updateThievingByUsername(thief: Thieving): Promise<{
        user: User;
        gold: number;
    }>;
}
