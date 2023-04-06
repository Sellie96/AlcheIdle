import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { PlayerData } from 'src/app/state/CharacterDataTypes';
import { CharacterState } from 'src/app/state/character.state';
import { BackpackService } from './backpack.service';

@UntilDestroy()
@Component({
  selector: 'app-backpack',
  templateUrl: './backpack.component.html',
  styleUrls: ['./backpack.component.scss'],
})
export class BackpackComponent implements OnInit {

  playerCharacter!: PlayerData;

  constructor(private store: Store, private backpackService: BackpackService) { }

  ngOnInit() {
    this.store
    .select((state) => CharacterState.selectCharacterStats(state.character))
    .pipe(untilDestroyed(this))
    .subscribe((character: PlayerData) => {
      this.playerCharacter = JSON.parse(JSON.stringify(character));
    });
  }


  equipItem(item: any) {
    this.backpackService.equipItem(item);
  }

}
