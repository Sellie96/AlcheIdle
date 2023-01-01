export declare class MonsterService {
    constructor();
    monsters: {
        name: string;
        health: number;
        maxHealth: number;
        attack: number;
        defence: number;
        level: number;
        xp: number;
        attackSpeed: number;
        loot: ({
            name: string;
            amount: number;
            value: number;
            restores: number;
        } | {
            name: string;
            amount: number;
            value: number;
            restores?: undefined;
        })[];
    }[];
    getMonsterListData(): Promise<{
        name: string;
        health: number;
        maxHealth: number;
        attack: number;
        defence: number;
        level: number;
        xp: number;
        attackSpeed: number;
        loot: ({
            name: string;
            amount: number;
            value: number;
            restores: number;
        } | {
            name: string;
            amount: number;
            value: number;
            restores?: undefined;
        })[];
    }[]>;
    getMonsterData(monster: any): Promise<any>;
}
