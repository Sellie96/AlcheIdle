import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { CharacterState } from 'src/app/state/character.state';
import { PlayerData } from 'src/app/state/CharacterDataTypes';

@UntilDestroy()
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {

  playerCharacter!: PlayerData;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store
    .select((state) => CharacterState.selectCharacterStats(state.character))
    .pipe(untilDestroyed(this))
    .subscribe((character: PlayerData) => {
      this.playerCharacter = JSON.parse(JSON.stringify(character));
    });
  }


  calculateXpForLevel() {
    let total = 0;
    for(let i = 0; i < this.playerCharacter.character.combatStats.progression.level; i++) {
      total += Math.floor(i + 300 * Math.pow(2, i / 7))
    }

    if(this.playerCharacter.character.combatStats.progression.experiencePoints >= total) {
      this.playerCharacter.character.combatStats.progression.level++
    }

    return total;
  }

}
