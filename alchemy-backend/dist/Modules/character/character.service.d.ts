import { RPGItems } from './../combat/items.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ItemType } from '../combat/items.service';
import { Stats } from './skills/combat.entity';
export interface Item {
    name: string;
    itemType: ItemType;
    equipable: boolean;
    stackable: boolean;
    stats: Stats;
    dropChance: number;
    special: boolean;
}
export declare class CharacterService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    equipItem(username: string, item: any): Promise<User>;
    unequipItem(username: string, type: any): Promise<User>;
    sellItem(username: string, item: any): Promise<User>;
    addStats(item: RPGItems, player: User): User;
    removeStats(item: any, player: User): User;
}
