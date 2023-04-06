import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterData } from './register.interface';
import { MessagesGateway } from 'src/Modules/messages/messages.gateway';
import { MessagesService } from 'src/Modules/messages/messages.service';
import { Woodcutting } from 'src/Modules/skills/woodcutting/entities/message.entity';
export declare class UsersService {
    private usersRepository;
    private messagesService;
    private messagesGateway;
    constructor(usersRepository: Repository<User>, messagesService: MessagesService, messagesGateway: MessagesGateway);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    updateOne(user: User): Promise<void>;
    findOneByUsername(username: string): Promise<User>;
    updateWoodcuttingByUsername(woodcutter: Woodcutting): Promise<{
        user: User;
        logAmount: number;
    }>;
    shouldLevelup(skill: number): number;
    remove(id: string): Promise<void>;
    doesUserExist(username: string): Promise<boolean>;
    register(registerData: RegisterData): Promise<User>;
    updateSkillByUsername(skill: any): Promise<{
        user: User;
        reward: {
            name: string;
            amount: number;
            value: any;
        };
        amount: number;
    }>;
    addItemToBackpack(user: User, skill: {
        type: {
            name: any;
        };
    }, reward: any, rewardAmount: number): void;
    removeItemFromBackpack(user: User, skill: {
        type: {
            name: any;
        };
    }): string;
}
