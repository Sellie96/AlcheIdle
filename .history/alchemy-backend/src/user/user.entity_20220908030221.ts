import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column({default: true})
    asActive: boolean;



    //remove element from array
    //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
}
