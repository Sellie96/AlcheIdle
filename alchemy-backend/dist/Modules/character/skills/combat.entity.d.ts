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
    evasion: number;
    blockChance: number;
    parryChance: number;
}
export declare class Defences {
    armor: number;
    maxArmor: number;
    magicResistance: number;
}
export declare class Elemental {
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
export declare class Magic {
    healingPower: number;
    spellPower: number;
}
export declare class Progression {
    experiencePoints: number;
    level: number;
    gold: number;
    inventorySize: number;
    encumbrance: number;
    skillPoints: number;
    talentPoints: number;
}
export declare class Resource {
    rage: number;
    energy: number;
    comboPoints: number;
    fireCharges: number;
    iceCharges: number;
    lightningCharges: number;
}
export declare class DebuffResistances {
    poisonResistance: number;
    bleedResistance: number;
    stunResistance: number;
    confuseResistance: number;
    charmResistance: number;
    fearResistance: number;
    silenceResistance: number;
}
export declare class CombatStats {
    stats: Stats;
    combat: Combat;
    defenses: Defences;
    elemental: Elemental;
    magic: Magic;
    progression: Progression;
    resource: Resource;
    debuffResistances: DebuffResistances;
}
