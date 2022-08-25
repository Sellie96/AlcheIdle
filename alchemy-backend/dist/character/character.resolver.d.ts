import { CreateCharacterInput } from './character.input';
import { CharacterService } from './character.service';
export declare class CharacterResolver {
    private characterService;
    constructor(characterService: CharacterService);
    character(id: string): Promise<import("./character.entity").Character>;
    getCharacters(): Promise<import("./character.entity").Character[]>;
    createCharacter(createCharacterInput: CreateCharacterInput): Promise<import("./character.entity").Character>;
}
