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



    //getRandomNumber function
    getRandomNumber() {
        return Math.floor(Math.random() * 100);
    }
}
