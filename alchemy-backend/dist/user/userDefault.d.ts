import { RegisterData } from './register.interface';
export declare function UserDataCreation(registerData: RegisterData): Promise<{
    username: string;
    password: any;
    asActive: boolean;
    character: {
        characterName: string;
        characterAlignment: string;
        currencies: {
            gold: number;
            energy: number;
            lifeForce: number;
            gems: number;
        };
        skills: {
            agility: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            alchemy: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            cooking: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            crafting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            firemaking: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            fishing: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            fletching: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            herblore: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            mining: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            runecrafting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            smithing: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            thieving: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
            woodcutting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
            };
        };
        backpack: any[];
        equipment: any[];
    };
}>;
