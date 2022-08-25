import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreateCharacter, UpdateWoodcutting } from './character.actions';
import { PlayerData } from './CharacterDataTypes';

export interface CharacterStateModel {
  playerData: PlayerData;
}

@State<CharacterStateModel>({
  name: 'character',
  defaults: {
    playerData: {
      userName: 'FullMetal',
      stats: {
        hpMax: 100,
        hpCurrent: 100,
        accuracy: 1000,
        armour: 0,
        potions: {
          small: 0,
          medium: 0,
          large: 0,
        },
        level: 1,
        xpMax: 100,
        xpCurrent: 0,
        damage: 15,
        evasion: 500,
        critChance: 1,
      },
      currencies: {
        gold: 0,
        energy: 100,
        lifeForce: 0,
        gems: 0,
      },
      skills: {
        agility: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        alchemy: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        cooking: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        crafting: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        firemaking: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        fishing: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        fletching: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        herblore: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        mining: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        runecrafting: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        smithing: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        thieving: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
        woodcutting: {
          level: 1,
          xpMax: 100,
          xpCurrent: 0,
        },
      },
      backpack: [],
      equipment: [],
    },
  },
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

  @Action(UpdateWoodcutting)
  SetUser(
    { patchState }: StateContext<CharacterStateModel>,
    { payload }: UpdateWoodcutting
  ) {
    patchState({
        playerData: payload
    });
  }
}
