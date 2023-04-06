import { CombatStats } from "./skills/combat.entity";
import { AllSkills } from "./skills/skills.entity";
export declare class Equipment {
    head: Object;
    neck: Object;
    shoulders: Object;
    chest: Object;
    hands: Object;
    waist: Object;
    legs: Object;
    feet: Object;
    ring1: Object;
    ring2: Object;
    trinket1: Object;
    trinket2: Object;
    mainHand: Object;
    offHand: Object;
    necklace: Object;
    cape: Object;
}
export declare class Character {
    id?: number;
    characterName: string;
    characterAlignment: string;
    combatStats: CombatStats;
    skills: AllSkills;
    backpack: any[];
    equipment: Equipment;
}
