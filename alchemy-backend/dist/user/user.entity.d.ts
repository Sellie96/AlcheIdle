import { Character } from 'src/Modules/character/character.entity';
export declare class User {
    id?: number;
    username: string;
    password: string;
    asActive: boolean;
    character: Character;
}
