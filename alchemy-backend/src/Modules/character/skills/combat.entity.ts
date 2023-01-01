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
  evasion: number;

  @Column()
  blockChance: number;

  @Column()
  parryChance: number;
}

export class Defences {
  @Column()
  armor: number;

  @Column()
  maxArmor: number;

  @Column()
  magicResistance: number;
}

export class Elemental {
  @Column()
  fireResistance: number;

  @Column()
  iceResistance: number;

  @Column()
  lightningResistance: number;

  @Column()
  fireAffinity: number;

  @Column()
  iceAffinity: number;

  @Column()
  lightningAffinity: number;

  @Column()
  fireWeakness: number;

  @Column()
  iceWeakness: number;

  @Column()
  lightningWeakness: number;
}

export class Magic {
  @Column()
  healingPower: number;

  @Column()
  spellPower: number;
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
  encumbrance: number;

  @Column()
  skillPoints: number;

  @Column()
  talentPoints: number;
}

export class Resource {
  @Column()
  rage: number;

  @Column()
  energy: number;

  @Column()
  comboPoints: number;

  @Column()
  fireCharges: number;

  @Column()
  iceCharges: number;

  @Column()
  lightningCharges: number;
}

export class DebuffResistances {
  @Column()
  poisonResistance: number;

  @Column()
  bleedResistance: number;

  @Column()
  stunResistance: number;

  @Column()
  confuseResistance: number;

  @Column()
  charmResistance: number;

  @Column()
  fearResistance: number;

  @Column()
  silenceResistance: number;
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
  elemental: Elemental;

  @Column()
  magic: Magic;

  @Column()
  progression: Progression;

  @Column()
  resource: Resource;

  @Column()
  debuffResistances: DebuffResistances;
}