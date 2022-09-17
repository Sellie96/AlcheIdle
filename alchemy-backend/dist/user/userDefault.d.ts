import { RegisterData } from './register.interface';
export declare function UserDataCreation(registerData: RegisterData): Promise<{
    username: string;
    password: any;
    asActive: boolean;
    character: {
        characterName: string;
        characterAlignment: string;
        combatStats: {
            hpCurrent: number;
            hpMax: number;
            attack: number;
            defence: number;
            strength: number;
            magic: number;
            ranged: number;
        };
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
                pet: boolean;
            };
            alchemy: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            cooking: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            crafting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            firemaking: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            fishing: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            fletching: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            herblore: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            mining: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            runecrafting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            smithing: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            thieving: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
            woodcutting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
            };
        };
        backpack: any[];
        equipment: any[];
    };
}>;
