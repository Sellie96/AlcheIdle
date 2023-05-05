export declare enum ItemType {
    HELM = "Helm",
    AMULET = "Amulet",
    BODY = "Body",
    LEGS = "Legs",
    GLOVES = "Gloves",
    RING = "Ring",
    BOOTS = "Boots",
    WEAPON = "Weapon",
    SHIELD = "Shield",
    CONSUMABLE = "Consumable"
}
export declare enum OffenseStat {
    HP = "HP",
    MANA = "Mana",
    CRIT_CHANCE = "Crit Chance",
    CRIT_DAMAGE = "Crit Damage",
    ATTACK_SPEED = "Attack Speed",
    ACCURACY = "Accuracy"
}
export declare enum AttributeStat {
    STRENGTH = "Strength",
    DEXTERITY = "Dexterity",
    INTELLIGENCE = "Intelligence",
    ENDURANCE = "Endurance",
    AGILITY = "Agility",
    LUCK = "Luck"
}
export declare enum DefenceStat {
    ARMOR = "Armor",
    EVASION = "Evasion",
    MAGIC_RESIST = "Magic Resist",
    BLOCK_CHANCE = "Block Chance",
    PARRY_CHANCE = "Parry Chance"
}
export declare enum ResistStat {
    FIRE_RES = "Fire Res",
    ICE_RES = "Ice Res",
    LIGHTNING_RES = "Lightning Res",
    POISON_RES = "Poison Res",
    BLEED_RES = "Bleed Res",
    STUN_RES = "Stun Res",
    CONFUSE_RES = "Confuse Res",
    SILENCE_RES = "Silence Res"
}
export declare type Stat = {
    name: OffenseStat | AttributeStat | DefenceStat | ResistStat;
    value: number;
};
export declare type Stats = {
    offense?: Stat[];
    attributes?: Stat[];
    defence?: Stat[];
    resists?: Stat[];
};
export declare class RPGItems {
    name: string;
    itemType: ItemType;
    equipable: boolean;
    stackable: boolean;
    stats: Stats;
    dropChance: number;
    special: boolean;
    amount: number;
    value: number;
    healAmount?: number;
    constructor(name: string, itemType: ItemType, equipable: boolean, stackable: boolean, stats: Stats, dropChance: number, special: boolean, amount: number, value: number, healAmount?: number);
}
