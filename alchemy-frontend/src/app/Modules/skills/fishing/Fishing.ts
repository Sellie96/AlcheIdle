import { SkillTypes } from "../Skills";

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
  skillType: String;
  level: number;
  xp: number;
  reward: string;
  time: number;
  value: number;
}

export enum FishNames {
  prawn = 'prawn',
  trout = 'trout',
  salmon = 'salmon',
  lobster = 'lobster',
  swordfish = 'swordfish',
  shark = 'shark',
  whale = 'whale',
  kraken = 'kraken',
}

export const fishTypes: Fishes = {
  prawn: {
    name: FishNames.prawn,
    skillType: SkillTypes.fishing,
    level: 1,
    xp: 10,
    reward: FishNames.prawn,
    time: 3,
    value: 1,
  },
  trout: {
    name: FishNames.trout,
    skillType: SkillTypes.fishing,
    level: 10,
    xp: 15,
    reward: FishNames.trout,
    time: 4,
    value: 5,
  },
  salmon: {
    name: FishNames.salmon,
    skillType: SkillTypes.fishing,
    level: 30,
    xp: 25,
    reward: FishNames.salmon,
    time: 5,
    value: 10,
  },
  lobster: {
    name: FishNames.lobster,
    skillType: SkillTypes.fishing,
    level: 45,
    xp: 45,
    reward: FishNames.lobster,
    time: 6,
    value: 20,
  },
  swordfish: {
    name: FishNames.swordfish,
    skillType: SkillTypes.fishing,
    level: 60,
    xp: 60,
    reward: FishNames.swordfish,
    time: 8,
    value: 35,
  },
  shark: {
    name: FishNames.shark,
    skillType: SkillTypes.fishing,
    level: 75,
    xp: 75,
    reward: FishNames.shark,
    time: 10,
    value: 50,
  },
  whale: {
    name: FishNames.whale,
    skillType: SkillTypes.fishing,
    level: 80,
    xp: 85,
    reward: FishNames.whale,
    time: 12,
    value: 75,
  },
  kraken: {
    name: FishNames.kraken,
    skillType: SkillTypes.fishing,
    level: 90,
    xp: 150,
    reward: FishNames.kraken,
    time: 20,
    value: 100,
  },
};

export const fishTypesToCatch: Fish[] = [
  fishTypes.prawn,
  fishTypes.trout,
  fishTypes.salmon,
  fishTypes.lobster,
  fishTypes.swordfish,
  fishTypes.shark,
  fishTypes.whale,
  fishTypes.kraken,
];

export const lockedFish: number[] = [
  fishTypes.prawn.level,
  fishTypes.trout.level,
  fishTypes.salmon.level,
  fishTypes.lobster.level,
  fishTypes.swordfish.level,
  fishTypes.shark.level,
  fishTypes.whale.level,
  fishTypes.kraken.level,
];
