export enum ItemType {
  HELM = 'Helm',
  AMULET = 'Amulet',
  BODY = 'Body',
  LEGS = 'Legs',
  GLOVES = 'Gloves',
  RING = 'Ring',
  BOOTS = 'Boots',
  WEAPON = 'Weapon',
  SHIELD = 'Shield',
}

export enum OffenseStat {
  HP = 'HP',
  MANA = 'Mana',
  CRIT_CHANCE = 'Crit Chance',
  CRIT_DAMAGE = 'Crit Damage',
  ATTACK_SPEED = 'Attack Speed',
  ACCURACY = 'Accuracy',
}

export enum AttributeStat {
  STRENGTH = 'Strength',
  DEXTERITY = 'Dexterity',
  INTELLIGENCE = 'Intelligence',
  ENDURANCE = 'Endurance',
  AGILITY = 'Agility',
  LUCK = 'Luck',
}

export enum DefenceStat {
  ARMOR = 'Armor',
  EVASION = 'Evasion',
  MAGIC_RESIST = 'Magic Resist',
  BLOCK_CHANCE = 'Block Chance',
  PARRY_CHANCE = 'Parry Chance',
}

export enum ResistStat {
  FIRE_RES = 'Fire Res',
  ICE_RES = 'Ice Res',
  LIGHTNING_RES = 'Lightning Res',
  POISON_RES = 'Poison Res',
  BLEED_RES = 'Bleed Res',
  STUN_RES = 'Stun Res',
  CONFUSE_RES = 'Confuse Res',
  SILENCE_RES = 'Silence Res',
}

export type Stat = {
  name: OffenseStat | AttributeStat | DefenceStat | ResistStat;
  value: number;
};

export type Stats = {
    offense?: Stat[];
    attributes?: Stat[];
    defence?: Stat[];
    resists?: Stat[];
  };

export class RPGItems {
  name: string;
  itemType: ItemType;
  equipable: boolean;
  stackable: boolean;
  stats: Stats;
  dropChance: number;
  special: boolean;
  amount: number;
  value: number;

  constructor(
    name: string,
    itemType: ItemType,
    equipable: boolean,
    stackable: boolean,
    stats: Stats,
    dropChance: number,
    special: boolean,
    amount: number,
    value: number
  ) {
    this.name = name;
    this.itemType = itemType;
    this.equipable = equipable;
    this.stackable = stackable;
    this.stats = {
      offense: stats.offense?.filter((stat) => stat.value !== 0),
      attributes: stats.attributes?.filter((stat) => stat.value !== 0),
      defence: stats.defence?.filter((stat) => stat.value !== 0),
      resists: stats.resists?.filter((stat) => stat.value !== 0),
    };
    this.dropChance = dropChance;
    this.special = special;
    this.amount = amount;
    this.value = value;
  }
}
