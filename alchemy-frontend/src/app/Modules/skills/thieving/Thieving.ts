export interface Thieving {
  name: string;
  level: number;
  xp: number;
  damage: number;
  time: number;
  value: number;
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
    level: 1,
    damage: 1,
    xp: 10,
    time: 3,
    value: 1,
  },
  goblin: {
    name: ThievingNames.goblin,
    level: 10,
    damage: 2,
    xp: 15,
    time: 4,
    value: 5,
  },
  ent: {
    name: ThievingNames.ent,
    level: 30,
    damage: 5,
    xp: 25,
    time: 5,
    value: 10,
  },
  dwarf: {
    name: ThievingNames.dwarf,
    level: 45,
    damage: 10,
    xp: 45,
    time: 6,
    value: 20,
  },
  elf: {
    name: ThievingNames.elf,
    level: 60,
    damage: 15,
    xp: 60,
    time: 8,
    value: 35,
  },
  dragon: {
    name: ThievingNames.dragon,
    level: 75,
    damage: 20,
    xp: 75,
    time: 10,
    value: 50,
  },
  demon: {
    name: ThievingNames.demon,
    level: 80,
    damage: 25,
    xp: 85,
    time: 12,
    value: 75,
  },
  vault: {
    name: ThievingNames.vault,
    level: 90,
    damage: 40,
    xp: 150,
    time: 20,
    value: 100,
  },
};
