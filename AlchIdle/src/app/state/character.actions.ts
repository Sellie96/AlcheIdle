import { PlayerData } from "./CharacterDataTypes";

export class CreateCharacter {
    static readonly type = '[character] create character';
    constructor(public payload: PlayerData) {}
}

export class UpdateCharacter {
    static readonly type = '[character] update character';
    constructor(public payload: PlayerData) {}
}