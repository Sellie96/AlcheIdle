import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"
import { Skill } from "./skill.entity";

@Entity()
export class AllSkills {
    @Column((type) => Skill)
    agility: Skill;

    @Column((type) => Skill)
    alchemy: Skill;

    @Column((type) => Skill)
    cooking: Skill;

    @Column((type) => Skill)
    crafting: Skill;

    @Column((type) => Skill)
    firemaking: Skill;

    @Column((type) => Skill)
    fishing: Skill;

    @Column((type) => Skill)
    fletching: Skill;

    @Column((type) => Skill)
    herblore: Skill;

    @Column((type) => Skill)
    mining: Skill;

    @Column((type) => Skill)
    runecrafting: Skill;

    @Column((type) => Skill)
    smithing: Skill;

    @Column((type) => Skill)
    thieving: Skill;

    @Column((type) => Skill)
    woodcutting: Skill;
}
