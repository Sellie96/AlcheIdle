import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreateCharacter, UpdateCharacter } from './character.actions';
import { PlayerData } from './CharacterDataTypes';

export interface CharacterStateModel {
  playerData: PlayerData;
}

@State<CharacterStateModel>({
  name: 'character',
})
@Injectable()
export class CharacterState {
  @Selector()
  static selectCharacterStats(state: CharacterStateModel) {
    return state.playerData;
  }

  @Action(CreateCharacter)
  createCharacter(
    { setState, getState }: StateContext<CharacterStateModel>,
    { payload }: CreateCharacter
  ) {
    setState({
      ...getState(),
      playerData: payload,
    });
  }

  @Action(UpdateCharacter)
  SetUser(
    { patchState }: StateContext<CharacterStateModel>,
    { payload }: UpdateCharacter
  ) {
    patchState({
        playerData: payload
    });
  }
}
