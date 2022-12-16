export declare class Fishing {
    username: string;
    fishType: Fish;
    jwt: string;
    timestamp: string;
}
export interface Fishes {
    prawn: Fish;
    trout: Fish;
    salmon: Fish;
    lobster: Fish;
    swordfish: Fish;
    shark: Fish;
    whale: Fish;
    kraken: Fish;
}
export interface Fish {
    name: string;
    skillType: string;
    level: number;
    xp: number;
    reward: string;
    time: number;
    value: number;
    amount: number;
}
export declare const Fishes: Fishes;
