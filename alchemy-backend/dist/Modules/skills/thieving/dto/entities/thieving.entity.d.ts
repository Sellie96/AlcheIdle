export declare class Thieving {
    username: string;
    thievingOption: ThievingOption;
    jwt: string;
    timestamp: string;
}
export interface ThievingOption {
    name: string;
    level: number;
    xp: number;
    logs: string;
    time: number;
    value: number;
}
