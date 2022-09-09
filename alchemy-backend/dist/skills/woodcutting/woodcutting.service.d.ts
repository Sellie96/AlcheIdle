import { WoodcuttingDto } from './dto/woodcutting.dto';
import { Woodcutting } from './entities/message.entity';
import { UsersService } from 'src/user/users.service';
export declare class WoodcuttingService {
    private usersService;
    constructor(usersService: UsersService);
    woodCuttingUsers: Woodcutting[];
    clientToUser: {};
    addToWoodcuttingActive(createMessageDto: WoodcuttingDto): Woodcutting[];
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
    findAll(): Woodcutting[];
    findOne(id: number): string;
    update(id: number): string;
    remove(id: number): string;
    updateWoodcuttingXp(): void;
}
