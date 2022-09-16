import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class AllCurrencies {

    @ObjectIdColumn ()
    id?: number;

    @Column()
    gold: number;
    
    @Column()
    energy: number;

    @Column()
    lifeForce: number;
    
    @Column()
    gems: number;
}