import { SkillTypes } from "../Skills";

export interface Thieving {
  name: string;
  skillType: String;
  level: number;
  xp: number;
  damage: number;
  time: number;
  reward: number;
}

export interface ThievingOptions {
  humans: Thieving;
  goblin: Thieving;
  ent: Thieving;
  dwarf: Thieving;
  elf: Thieving;
  dragon: Thieving;
  demon: Thieving;
  vault: Thieving;
}

export enum ThievingNames {
  humans = 'humans',
  goblin = 'goblin',
  ent = 'ent',
  dwarf = 'dwarf',
  elf = 'elf',
  dragon = 'dragon',
  demon = 'demon',
  vault = 'vault',
}

export const thievingOptions: ThievingOptions = {
  humans: {
    name: ThievingNames.humans,
    skillType: SkillTypes.thieving,
    level: 1,
    damage: 1,
    xp: 10,
    time: 3,
    reward: 1,
  },
  goblin: {
    name: ThievingNames.goblin,
    skillType: SkillTypes.thieving,
    level: 10,
    damage: 2,
    xp: 15,
    time: 4,
    reward: 5,
  },
  ent: {
    name: ThievingNames.ent,
    skillType: SkillTypes.thieving,
    level: 30,
    damage: 5,
    xp: 25,
    time: 5,
    reward: 10,
  },
  dwarf: {
    name: ThievingNames.dwarf,
    skillType: SkillTypes.thieving,
    level: 45,
    damage: 10,
    xp: 45,
    time: 6,
    reward: 20,
  },
  elf: {
    name: ThievingNames.elf,
    skillType: SkillTypes.thieving,
    level: 60,
    damage: 15,
    xp: 60,
    time: 8,
    reward: 35,
  },
  dragon: {
    name: ThievingNames.dragon,
    skillType: SkillTypes.thieving,
    level: 75,
    damage: 20,
    xp: 75,
    time: 10,
    reward: 50,
  },
  demon: {
    name: ThievingNames.demon,
    skillType: SkillTypes.thieving,
    level: 80,
    damage: 25,
    xp: 85,
    time: 12,
    reward: 75,
  },
  vault: {
    name: ThievingNames.vault,
    skillType: SkillTypes.thieving,
    level: 90,
    damage: 40,
    xp: 150,
    time: 20,
    reward: 100,
  },
};


export const thievingTargets: Thieving[] = [
  thievingOptions.humans,
  thievingOptions.goblin,
  thievingOptions.ent,
  thievingOptions.dwarf,
  thievingOptions.elf,
  thievingOptions.dragon,
  thievingOptions.demon,
  thievingOptions.vault,
]

export const lockedTargets: number[] = [
  thievingOptions.humans.level,
  thievingOptions.goblin.level,
  thievingOptions.ent.level,
  thievingOptions.dwarf.level,
  thievingOptions.elf.level,
  thievingOptions.dragon.level,
  thievingOptions.demon.level,
  thievingOptions.vault.level,
]
