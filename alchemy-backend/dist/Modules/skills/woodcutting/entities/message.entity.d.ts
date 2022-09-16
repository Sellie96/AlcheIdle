export declare class Woodcutting {
    username: string;
    treeType: Tree;
    jwt: string;
}
export interface Tree {
    name: string;
    level: number;
    xp: number;
    logs: string;
    time: number;
}
