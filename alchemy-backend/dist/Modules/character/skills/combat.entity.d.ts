export declare class Stats {
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
export declare class Combat {
    criticalHitChance: number;
    criticalHitDamage: number;
    attackSpeed: number;
    castSpeed: number;
    accuracy: number;
    blockChance: number;
    parryChance: number;
}
export declare class Defences {
    armor: number;
    magicResistance: number;
    evasion: number;
}
export declare class Resistances {
    fireResistance: number;
    iceResistance: number;
    lightningResistance: number;
    poisonResistance: number;
    bleedResistance: number;
    stunResistance: number;
    confuseResistance: number;
    silenceResistance: number;
}
export declare class Progression {
    experiencePoints: number;
    level: number;
    gold: number;
    inventorySize: number;
    skillPoints: number;
    talentPoints: number;
}
export declare class CombatStats {
    stats: Stats;
    combat: Combat;
    defenses: Defences;
    resistances: Resistances;
    progression: Progression;
}
