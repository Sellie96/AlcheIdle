import { AllCurrencies } from "./currencies/currencies.entity";
import { AllSkills } from "./skills/skills.entity";
export declare class Character {
    id?: number;
    characterName: string;
    characterAlignment: string;
    currencies: AllCurrencies;
    skills: AllSkills;
    backpack: object[];
    equipment: object[];
}
