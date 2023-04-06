import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"
import { AllCurrencies } from "./currencies/currencies.entity";
import { CombatStats } from "./skills/combat.entity";
import { AllSkills } from "./skills/skills.entity";

@Entity()
export class Equipment {
    @Column()
    head: Object;

    @Column()
    neck: Object;

    @Column()
    shoulders: Object;

    @Column()
    chest: Object;

    @Column()
    hands: Object;

    @Column()
    waist: Object;

    @Column()
    legs: Object;

    @Column()
    feet: Object;

    @Column()
    ring1: Object;

    @Column()
    ring2: Object;

    @Column()
    trinket1: Object;

    @Column()
    trinket2: Object;

    @Column()
    mainHand: Object;

    @Column()
    offHand: Object;

    @Column()
    necklace: Object;

    @Column()
    cape: Object;
}


@Entity()
export class Character {
    @ObjectIdColumn ()
    id?: number;
    
    @Column()
    characterName: string;
    
    @Column()
    characterAlignment: string;

    @Column((type) => CombatStats)
    combatStats: CombatStats;

    @Column((type) => AllSkills)
    skills: AllSkills;

    @Column()
    backpack: any[];

    @Column()
    equipment: Equipment;
}

