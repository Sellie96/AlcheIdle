export interface Trees {
  tree: Tree;
  oak: Tree;
  willow: Tree;
  bonsai: Tree;
  yew: Tree;
  magic: Tree;
  demon: Tree;
  divine: Tree;
}

export interface Tree {
  name: string;
  level: number;
  xp: number;
  logs: string;
  time: number;
}

export interface Logs {
  logs: number;
  oak: number;
  willow: number;
  bonsai: number;
  yew: number;
  magic: number;
  demon: number;
  divine: number;
}

export const logTypes = {
  logs: 0,
  oak: 0,
  willow: 0,
  bonsai: 0,
  yew: 0,
  magic: 0,
  demon: 0,
  divine: 0,
};

export enum TreeNames {
  tree = 'tree',
  oak = 'oak',
  willow = 'willow',
  bonsai = 'bonsai',
  yew = 'yew',
  magic = 'magic',
  demon = 'demon',
  divine = 'divine',
 }

 export enum LogNames {
  logs = 'Logs',
  oak = 'Oak logs',
  willow = 'Willow logs',
  bonsai = 'Bonsai logs',
  yew = 'Yew logs',
  magic = 'Magic logs',
  demon = 'Demon logs',
  divine = 'Divine logs',
 }

export const treeTypes: Trees = {
  tree: { name: TreeNames.tree, level: 1, xp: 10, logs: LogNames.logs, time: 3 },
  oak: { name: TreeNames.oak, level: 10, xp: 15, logs: LogNames.oak, time: 4 },
  willow: { name: TreeNames.willow, level: 30, xp: 25, logs: LogNames.willow, time: 5 },
  bonsai: { name: TreeNames.bonsai, level: 45, xp: 45, logs: LogNames.bonsai, time: 6 },
  yew: { name: TreeNames.yew, level: 60, xp: 60, logs: LogNames.yew, time: 8 },
  magic: { name: TreeNames.magic, level: 75, xp: 75, logs: LogNames.magic, time: 45 },
  demon: { name: TreeNames.demon, level: 80, xp: 85, logs: LogNames.demon, time: 55 },
  divine: { name: TreeNames.divine, level: 90, xp: 150, logs: LogNames.divine, time: 120 },
};