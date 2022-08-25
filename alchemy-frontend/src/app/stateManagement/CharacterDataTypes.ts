export interface Skill {
  level: number;
  xpMax: number;
  xpCurrent: number;
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
  hpMax: number;
  hpCurrent: number;
  accuracy: number;
  armour: number;
  potions: {
    small: number;
    medium: number;
    large: number;
  };
  level: number;
  xpMax: number;
  xpCurrent: number;
  damage: number;
  evasion: number;
  critChance: number;
}

export interface PlayerData {
  userName: string;
  stats: PlayerStats;
  currencies: AllCurrencies;
  skills: AllSkills;
  backpack: object[];
  equipment: object[];
}
