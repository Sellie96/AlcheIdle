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
                tool: {};
            };
            alchemy: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            cooking: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            crafting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            firemaking: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            fishing: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {
                    name: string;
                    bonus: number;
                };
            };
            fletching: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            herblore: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            mining: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            runecrafting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            smithing: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            thieving: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            woodcutting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {
                    name: string;
                    bonus: number;
                };
            };
        };
        backpack: any[];
        equipment: any[];
    };
}>;
