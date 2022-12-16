import { UsersService } from 'src/user/users.service';
import { Firemaking } from './entities/firemaking.entity';
export declare class FiremakingService {
    private usersService;
    firemakingUsers: Firemaking[];
    timeLeft: number;
    clientToUser: {};
    constructor(usersService: UsersService);
    addToFiremakingActive(activeLog: Firemaking): Promise<any>;
}
