export interface Skill {
  level: number;
  xpMax: number;
  xpCurrent: number;
  pet?: boolean;
  tool?: Tool;
}

export interface AllSkills {
  agility: Skill;
  alchemy: Skill;
  cooking: Skill;
  crafting: Skill;
  firemaking: Skill;
  fishing: Skill;
  fletching: Skill;
  herblore: Skill;
  mining: Skill;
  runecrafting: Skill;
  smithing: Skill;
  thieving: Skill;
  woodcutting: Skill;
}

export interface AllCurrencies {
  gold: number;
  energy: number;
  lifeForce: number;
  gems: number;
}

export interface PlayerStats {
  hpCurrent: number,
  hpMax: number,
  attack: number,
  defence: number,
  strength: number,
  magic: number,
  ranged: number,
}

export interface PlayerData {
  id: string;
  username: string;
  password: string;
  asActive: boolean;
  character: Character;
}

export interface Character {
  characterAlignment: string;
  characterName: string;
  combatStats: PlayerStats;
  currencies: AllCurrencies;
  skills: AllSkills;
  backpack: any[];
  equipment: any[];
}

export interface Tool {
  name: string;
  bonus: number;
}