import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class Skill {    

    @ObjectIdColumn ()
    id?: number;

    @Column()
    level: number;
    
    @Column()
    xpMax: number;

    @Column()
    xpCurrent: number;

    @Column()
    pet?: boolean;
}