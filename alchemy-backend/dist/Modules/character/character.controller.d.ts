import { AuthService } from 'src/auth/auth.service';
import { CharacterService, Item } from './character.service';
export declare class CharacterController {
    private characterService;
    private authService;
    constructor(characterService: CharacterService, authService: AuthService);
    equipItem(req: any, item: Item): Promise<{
        message: string;
        player: import("../../user/user.entity").User;
    }>;
    unequipItem(req: any, type: string): Promise<{
        message: string;
        player: import("../../user/user.entity").User;
    }>;
    sellItem(req: any, item: any): Promise<{
        message: string;
        player: import("../../user/user.entity").User;
    }>;
}
