import { PlayerData } from "./CharacterDataTypes";

export class CreateCharacter {
    static readonly type = '[character] create character';
    constructor(public payload: PlayerData) {}
}

export class UpdateWoodcutting {
    static readonly type = '[character] update woodcutting';
    constructor(public payload: PlayerData) {}
}