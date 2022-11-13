import { SkillTypes } from "../Skills";

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
  skillType: String;
  level: number;
  xp: number;
  reward: string;
  time: number;
  value: number;
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
  tree = 'normal',
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
  tree: {
    name: TreeNames.tree,
    skillType: SkillTypes.woodcutting,
    level: 1,
    xp: 10,
    reward: LogNames.logs,
    time: 3,
    value: 1,
  },
  oak: {
    name: TreeNames.oak,
    skillType: SkillTypes.woodcutting,
    level: 10,
    xp: 15,
    reward: LogNames.oak,
    time: 4,
    value: 5,
  },
  willow: {
    name: TreeNames.willow,
    skillType: SkillTypes.woodcutting,
    level: 30,
    xp: 25,
    reward: LogNames.willow,
    time: 5,
    value: 10,
  },
  bonsai: {
    name: TreeNames.bonsai,
    skillType: SkillTypes.woodcutting,
    level: 45,
    xp: 45,
    reward: LogNames.bonsai,
    time: 6,
    value: 20,
  },
  yew: {
    name: TreeNames.yew,
    skillType: SkillTypes.woodcutting,
    level: 60,
    xp: 60,
    reward: LogNames.yew,
    time: 8,
    value: 35,
  },
  magic: {
    name: TreeNames.magic,
    skillType: SkillTypes.woodcutting,
    level: 75,
    xp: 75,
    reward: LogNames.magic,
    time: 10,
    value: 50,
  },
  demon: {
    name: TreeNames.demon,
    skillType: SkillTypes.woodcutting,
    level: 80,
    xp: 85,
    reward: LogNames.demon,
    time: 12,
    value: 75,
  },
  divine: {
    name: TreeNames.divine,
    skillType: SkillTypes.woodcutting,
    level: 90,
    xp: 150,
    reward: LogNames.divine,
    time: 20,
    value: 100,
  },
};

export const treeTypesToChop: Tree[] = [
  treeTypes.tree,
  treeTypes.oak,
  treeTypes.willow,
  treeTypes.bonsai,
  treeTypes.yew,
  treeTypes.magic,
  treeTypes.demon,
  treeTypes.divine,
];

export const lockedTrees: number[] = [
  treeTypes.oak.level,
  treeTypes.willow.level,
  treeTypes.bonsai.level,
  treeTypes.yew.level,
  treeTypes.magic.level,
  treeTypes.demon.level,
  treeTypes.divine.level,
];
