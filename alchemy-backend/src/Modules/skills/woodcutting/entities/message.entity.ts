export class Woodcutting {
  username: string;
  treeType: Tree;
  jwt: string;
  timestamp: string;
}

export interface Tree {
  name: string;
  level: number;
  xp: number;
  logs: string;
  time: number;
  value: number;
}
