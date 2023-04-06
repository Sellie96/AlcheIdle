export declare class Woodcutting {
    username: string;
    type: Tree;
    jwt: string;
    timestamp: string;
}
export interface Tree {
    name: string;
    level: number;
    xp: number;
    reward: string;
    time: number;
    value: number;
}
export interface Logs {
    normal: Log;
    oak: Log;
    willow: Log;
    bonsai: Log;
    yew: Log;
    magic: Log;
    demonic: Log;
    divine: Log;
}
export interface Log {
    name: string;
    skillType: string;
    level: number;
    xp: number;
    reward: string;
    time: number;
    value: number;
    amount: number;
}
export declare const Logs: Logs;
