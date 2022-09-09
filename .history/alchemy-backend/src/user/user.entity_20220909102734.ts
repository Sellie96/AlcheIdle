import { Character } from 'src/character/Character.entity';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn ()
    id?: number;
    
    @Column()
    username: string;

    @Column()
    password: string;
    
    @Column({default: true})
    asActive: boolean;

    @Column((type) => Character)
    character: Character;
}
