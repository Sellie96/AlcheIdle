import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Item } from './shop.controller';
export declare class ShopService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    ironAxe: {
        name: string;
        bonus: number;
    };
    steelAxe: {
        name: string;
        bonus: number;
    };
    crystalAxe: {
        name: string;
        bonus: number;
    };
    buyItem(username: string, item: Item): Promise<any>;
    buyItemUpdate(userData: User, item: Item, itemToBuy: any): {
        message: string;
        userData: User;
    };
}
