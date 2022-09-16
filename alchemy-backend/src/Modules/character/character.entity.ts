import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"
import { AllCurrencies } from "./currencies/currencies.entity";
import { AllSkills } from "./skills/skills.entity";

@Entity()
export class Character {
    @ObjectIdColumn ()
    id?: number;
    
    @Column()
    characterName: string;
    
    @Column()
    characterAlignment: string;

    @Column((type) => AllCurrencies)
    currencies: AllCurrencies;

    @Column((type) => AllSkills)
    skills: AllSkills;

    @Column()
    backpack: object[];

    @Column()
    equipment: object[];
}


