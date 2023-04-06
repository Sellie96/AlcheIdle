import { Column, Entity, ObjectIdColumn } from 'typeorm';

export class Stats {
  @Column()
  health: number;

  @Column()
  maxHealth: number;

  @Column()
  mana: number;

  @Column()
  maxMana: number;

  @Column()
  strength: number;

  @Column()
  dexterity: number;

  @Column()
  intelligence: number;

  @Column()
  endurance: number;

  @Column()
  agility: number;

  @Column()
  luck: number;
}

export class Combat {
  @Column()
  criticalHitChance: number;

  @Column()
  criticalHitDamage: number;

  @Column()
  attackSpeed: number;

  @Column()
  castSpeed: number;

  @Column()
  accuracy: number;

  @Column()
  blockChance: number;

  @Column()
  parryChance: number;
}

export class Defences {
  @Column()
  armor: number;

  @Column()
  magicResistance: number;

  @Column()
  evasion: number;
}

export class Resistances {
  @Column()
  fireResistance: number;

  @Column()
  iceResistance: number;

  @Column()
  lightningResistance: number;

  @Column()
  poisonResistance: number;

  @Column()
  bleedResistance: number;

  @Column()
  stunResistance: number;

  @Column()
  confuseResistance: number;

  @Column()
  silenceResistance: number;
}

export class Progression {
  @Column()
  experiencePoints: number;

  @Column()
  level: number;

  @Column()
  gold: number;

  @Column()
  inventorySize: number;

  @Column()
  skillPoints: number;

  @Column()
  talentPoints: number;
}

@Entity()
export class CombatStats {
  @Column()
  stats: Stats;

  @Column()
  combat: Combat;

  @Column()
  defenses: Defences;

  @Column()
  resistances: Resistances;

  @Column()
  progression: Progression;
}