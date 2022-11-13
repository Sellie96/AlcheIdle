import { SkillTypes } from "../Skills";

export interface Ores {
    essence: Ore;
    copper: Ore;
    tin: Ore;
    iron: Ore;
    coal: Ore;
    gems: Ore;
    gold: Ore;
    dragonbane: Ore;
  }
  
  export interface Ore {
    name: string;
    skillType: string;
    level: number;
    xp: number;
    reward: string;
    time: number;
    value: number;
  }
  
  export enum OreNames {
    essence = 'essence',
    copper = 'copper',
    tin = 'tin',
    iron = 'iron',
    coal = 'coal',
    gems = 'gems',
    gold = 'gold',
    dragonbane = 'dragonbane'
   }
  
  export const oreTypes: Ores = {
    essence: { name: OreNames.essence, skillType: SkillTypes.mining, level: 1, xp: 10, reward: OreNames.essence, time: 3, value: 1 },
    copper: { name: OreNames.copper, skillType: SkillTypes.mining, level: 10, xp: 15, reward: OreNames.copper, time: 4, value: 5 },
    tin: { name: OreNames.tin, skillType: SkillTypes.mining, level: 30, xp: 25, reward: OreNames.tin, time: 5, value: 10 },
    iron: { name: OreNames.iron, skillType: SkillTypes.mining, level: 45, xp: 45, reward: OreNames.iron, time: 6, value: 20 },
    coal: { name: OreNames.coal, skillType: SkillTypes.mining, level: 60, xp: 60, reward: OreNames.coal, time: 8, value: 35 },
    gems: { name: OreNames.gems, skillType: SkillTypes.mining, level: 75, xp: 75, reward: OreNames.gems, time: 10, value: 50 },
    gold: { name: OreNames.gold, skillType: SkillTypes.mining, level: 80, xp: 85, reward: OreNames.gold, time: 12, value: 75 },
    dragonbane: { name: OreNames.dragonbane, skillType: SkillTypes.mining, level: 90, xp: 150, reward: OreNames.dragonbane, time: 20, value: 100 },
  };
  
  export const oreTypesToMine: Ore[] = [
    oreTypes.essence,
    oreTypes.copper,
    oreTypes.tin,
    oreTypes.iron,
    oreTypes.coal,
    oreTypes.gems,
    oreTypes.gold,
    oreTypes.dragonbane
  ]
  
  export const lockedOres: number[] = [
    oreTypes.essence.level,
    oreTypes.copper.level,
    oreTypes.tin.level,
    oreTypes.iron.level,
    oreTypes.coal.level,
    oreTypes.gems.level,
    oreTypes.gold.level,
    oreTypes.dragonbane.level
  ]