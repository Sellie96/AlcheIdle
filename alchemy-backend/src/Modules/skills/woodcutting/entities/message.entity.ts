export class Woodcutting {
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

export const Logs: Logs = {
  normal: {
    name: 'Logs',
    skillType: 'firemaking',
    level: 1,
    xp: 40,
    reward: 'Logs',
    time: 4,
    value: 1,
    amount: 1,
  },
  oak: {
    name: 'Oak logs',
    skillType: 'firemaking',
    level: 15,
    xp: 60,
    reward: 'Oak Logs',
    time: 6,
    value: 1,
    amount: 1,
  },
  willow: {
    name: 'Willow logs',
    skillType: 'firemaking',
    level: 30,
    xp: 90,
    reward: 'Willow logs',
    time: 8,
    value: 1,
    amount: 1,
  },
  bonsai: {
    name: 'Bonsai logs',
    skillType: 'firemaking',
    level: 45,
    xp: 120,
    reward: 'Bonsai logs',
    time: 10,
    value: 1,
    amount: 1,
  },
  yew: {
    name: 'Yew logs',
    skillType: 'firemaking',
    level: 60,
    xp: 150,
    reward: 'Yew logs',
    time: 12,
    value: 1,
    amount: 1,
  },
  magic: {
    name: 'Magic logs',
    skillType: 'firemaking',
    level: 75,
    xp: 180,
    reward: 'Magic logs',
    time: 14,
    value: 1,
    amount: 1,
  },
  demonic: {
    name: 'Demonic logs',
    skillType: 'firemaking',
    level: 90,
    xp: 210,
    reward: 'Demonic logs',
    time: 16,
    value: 1,
    amount: 1,
  },
  divine: {
    name: 'Divine logs',
    skillType: 'firemaking',
    level: 99,
    xp: 240,
    reward: 'Divine logs',
    time: 18,
    value: 1,
    amount: 1,
  },
};
