export class Fishing {
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


export const Fishes: Fishes = {
  prawn: {
    name: 'prawn',
    skillType: 'cooking',
    level: 1,
    xp: 40,
    reward: 'prawn',
    time: 4,
    value: 1,
    amount: 1,
  },
  trout: {
    name: 'trout',
    skillType: 'cooking',
    level: 15,
    xp: 60,
    reward: 'trout',
    time: 6,
    value: 1,
    amount: 1,
  },
  salmon: {
    name: 'salmon',
    skillType: 'cooking',
    level: 30,
    xp: 90,
    reward: 'salmon',
    time: 8,
    value: 1,
    amount: 1,
  },
  lobster: {
    name: 'lobster',
    skillType: 'cooking',
    level: 40,
    xp: 120,
    reward: 'lobster',
    time: 10,
    value: 1,
    amount: 1,
  },
  swordfish: {
    name: 'swordfish',
    skillType: 'cooking',
    level: 50,
    xp: 150,
    reward: 'swordfish',
    time: 12,
    value: 1,
    amount: 1,
  },
  shark: {
    name: 'shark',
    skillType: 'cooking',
    level: 60,
    xp: 180,
    reward: 'shark',
    time: 14,
    value: 1,
    amount: 1,
  },
  whale: {
    name: 'whale',
    skillType: 'cooking',
    level: 70,
    xp: 210,
    reward: 'whale',
    time: 16,
    value: 1,
    amount: 1,
  },
  kraken: {
    name: 'kraken',
    skillType: 'cooking',
    level: 80,
    xp: 240,
    reward: 'kraken',
    time: 18,
    value: 1,
    amount: 1,
  },
};
