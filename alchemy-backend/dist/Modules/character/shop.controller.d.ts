import { ShopService } from './shop.service';
import { AuthService } from 'src/auth/auth.service';
export interface Item {
    name: string;
    description: string;
    value: number;
}
export declare class ShopController {
    private shopService;
    private authService;
    constructor(shopService: ShopService, authService: AuthService);
    buyItem(req: any, item: Item): Promise<any>;
}
