import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterData } from './register.interface';
import { MessagesGateway } from 'src/Modules/messages/messages.gateway';
import { MessagesService } from 'src/Modules/messages/messages.service';
import { Woodcutting } from 'src/Modules/skills/woodcutting/entities/message.entity';
import { Thieving } from 'src/Modules/skills/thieving/entities/thieving.entity';
import { Fishing } from 'src/Modules/skills/fishing/entities/fishing.entity';
import { Mining } from 'src/Modules/skills/mining/entities/message.entity';
import { Agility } from 'src/Modules/skills/agility/entities/message.entity';
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
    shouldLevelup(skill: number): number;
    remove(id: string): Promise<void>;
    doesUserExist(username: string): Promise<boolean>;
    register(registerData: RegisterData): Promise<User>;
    updateThievingByUsername(thief: Thieving): Promise<{
        user: User;
        gold: number;
    }>;
    updateFishingByUsername(fisher: Fishing): Promise<{
        user: User;
        fishAmount: number;
    }>;
    updateMiningByUsername(miner: Mining): Promise<{
        user: User;
        oreAmount: number;
    }>;
    updateAgilityByUsername(agility: Agility): Promise<{
        user: User;
        marksAmount: number;
    }>;
}
