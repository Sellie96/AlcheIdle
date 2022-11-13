export declare class Mining {
    username: string;
    oreType: Ore;
    jwt: string;
    timestamp: string;
}
export interface Ore {
    name: string;
    level: number;
    xp: number;
    reward: string;
    time: number;
    value: number;
}
