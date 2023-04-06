import { UsersService } from './../../user/users.service';
import { User } from 'src/user/user.entity';
import { MessagesGateway } from '../messages/messages.gateway';
export declare class CombatService {
    private messagesService;
    private usersService;
    constructor(messagesService: MessagesGateway, usersService: UsersService);
    updatePlayerLoot(gold: number, xp: number, player: User, monster: any): User;
    checkIfLevelUp(player: User): User;
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
    calculatePlayerHealth(player: User, monster: any): User;
    calculateMonsterHealth(player: User, monster: any): any;
}
