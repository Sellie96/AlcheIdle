import { PlayerData } from './../state/CharacterDataTypes';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { CharacterState } from '../state/character.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss'],
})
export class AbilityComponent implements OnInit {

  playerData!: PlayerData;

  constructor(private store: Store) { }

  ngOnInit() {

    this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(untilDestroyed(this))
      .subscribe((character: PlayerData) => {
        this.playerData = character;
      });

  }

  calculateXpToNextLevel() {
    
  }

  getXp() {
    return "5"
  }

}
