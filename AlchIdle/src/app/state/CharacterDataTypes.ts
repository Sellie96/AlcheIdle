import { RPGItems } from './../../../../alchemy-backend/src/Modules/combat/items.service';
import { Interface } from "readline";

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

interface Stats {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  endurance: number;
  agility: number;
  luck: number;
}

interface Defenses {
  armor: number;
  maxArmor: number;
  magicResistance: number;
  evasion: number;
}

interface Combat {
  criticalHitChance: number;
  criticalHitDamage: number;
  attackSpeed: number;
  castSpeed: number;
  accuracy: number;
  blockChance: number;
  parryChance: number;
}

interface Resistances {
  fireResistance: number;
  iceResistance: number;
  lightningResistance: number;
  poisonResistance: number;
  bleedResistance: number;
  stunResistance: number;
  confuseResistance: number;
  silenceResistance: number;
}

interface Progression {
  experiencePoints: number;
  level: number;
  gold: number;
  inventorySize: number;
  skillPoints: number;
  talentPoints: number;
}

export interface PlayerStats {
  stats: Stats;
  defenses: Defenses;
  combat: Combat;
  resistances: Resistances;
  progression: Progression;
}

export interface PlayerData {
  id: string;
  username: string;
  password: string;
  asActive: boolean;
  character: Character;
}

export interface Equips {
  head: RPGItems;
  mainHand: RPGItems;
  offHand: RPGItems;
  ring1: RPGItems;
  ring2: RPGItems;
  feet: RPGItems;
  neck: RPGItems;
  chest: RPGItems;
  legs: RPGItems;
  hands: RPGItems;
}

export interface Character {
  characterAlignment: string;
  characterName: string;
  combatStats: PlayerStats;
  currencies: AllCurrencies;
  skills: AllSkills;
  backpack: any[];
  equipment: Equips;
}

export interface Tool {
  name: string;
  bonus: number;
}