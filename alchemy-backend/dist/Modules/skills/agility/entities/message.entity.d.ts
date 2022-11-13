export declare class Agility {
    username: string;
    courseType: Course;
    jwt: string;
    timestamp: string;
}
export interface Course {
    name: string;
    level: number;
    xp: number;
    reward: string;
    time: number;
    value: number;
}
