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

export const treeTypes: Trees = {
  tree: { name: 'tree', level: 1, xp: 4, logs: 'Logs', time: 5 },
  oak: { name: 'oak', level: 2, xp: 10, logs: 'Oak Logs', time: 10 },
  willow: { name: 'willow', level: 5, xp: 30, logs: 'Willow Logs', time: 15 },
  bonsai: { name: 'bonsai', level: 10, xp: 45, logs: 'Bonsai Logs', time: 20 },
  yew: { name: 'yew', level: 12, xp: 60, logs: 'Yew Logs', time: 25 },
  magic: { name: 'magic', level: 14, xp: 75, logs: 'Magic Logs', time: 45 },
  demon: { name: 'demon', level: 15, xp: 85, logs: 'Demon Logs', time: 55 },
  divine: {
    name: 'divine',
    level: 18,
    xp: 150,
    logs: 'Divine Logs',
    time: 120,
  },
};
