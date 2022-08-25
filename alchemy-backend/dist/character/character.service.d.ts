import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { CreateCharacterInput } from './character.input';
export declare class CharacterService {
    private characterRepository;
    constructor(characterRepository: Repository<Character>);
    getCharacter(id: string): Promise<Character>;
    getCharacters(): Promise<Character[]>;
    createCharacter(createCharacterInput: CreateCharacterInput): Promise<Character>;
}
