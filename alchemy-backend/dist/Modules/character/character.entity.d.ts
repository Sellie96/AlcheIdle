import { AllCurrencies } from "./currencies/currencies.entity";
import { CombatStats } from "./skills/combat.entity";
import { AllSkills } from "./skills/skills.entity";
export declare class Character {
    id?: number;
    characterName: string;
    characterAlignment: string;
    combatStats: CombatStats;
    currencies: AllCurrencies;
    skills: AllSkills;
    backpack: any[];
    equipment: object[];
}
