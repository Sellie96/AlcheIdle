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
}

interface Combat {
  criticalHitChance: number;
  criticalHitDamage: number;
  attackSpeed: number;
  castSpeed: number;
  accuracy: number;
  evasion: number;
  blockChance: number;
  parryChance: number;
}

interface Elemental {
  fireResistance: number;
  iceResistance: number;
  lightningResistance: number;
  fireAffinity: number;
  iceAffinity: number;
  lightningAffinity: number;
  fireWeakness: number;
  iceWeakness: number;
  lightningWeakness: number;
}

interface Magic {
  healingPower: number;
  spellPower: number;
}

interface Progression {
  experiencePoints: number;
  level: number;
  gold: number;
  inventorySize: number;
  encumbrance: number;
  skillPoints: number;
  talentPoints: number;
}

interface Resource {
  rage: number;
  energy: number;
  comboPoints: number;
  fireCharges: number;
  iceCharges: number;
  lightningCharges: number;
}

interface DebuffResistances {
  poisonResistance: number;
  bleedResistance: number;
  stunResistance: number;
  confuseResistance: number;
  charmResistance: number;
  fearResistance: number;
  silenceResistance: number;
}

export interface PlayerStats {
  stats: Stats;
  defenses: Defenses;
  combat: Combat;
  elemental: Elemental;
  magic: Magic;
  progression: Progression;
  resource: Resource;
  debuffResistances: DebuffResistances;
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