import { Character } from 'src/character/Character.entity';
export declare class User {
    id?: number;
    username: string;
    password: string;
    asActive: boolean;
    character: Character;
}
