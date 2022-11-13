import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { CharacterState } from 'src/app/stateManagement/character/character.state';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { InspectComponent } from './inspect/inspect.component';

@Component({
  selector: 'app-backpack',
  templateUrl: './backpack.component.html',
  styleUrls: ['./backpack.component.scss']
})

@UntilDestroy()
export class BackpackComponent implements OnInit {

  playerCharacter!: PlayerData;
  backpackSlots: number = 0;
  numbers: number[] = [];

  constructor(private store: Store, public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.store
    .select((state) => CharacterState.selectCharacterStats(state.character))
    .pipe(untilDestroyed(this))
    .subscribe((character: PlayerData) => {
      this.playerCharacter = JSON.parse(JSON.stringify(character));
    });


    this.backpackSlots = this.playerCharacter.character.backpack.length;

    this.numbers = Array(102 - this.backpackSlots).fill(0).map((x,i)=>i);
  }


  openDialog(item: any): void {
    this.dialog.open(InspectComponent, {
      data: {
        name: item.name,
        amount: item.amount,
        value: item.value,
      },
      scrollStrategy: new NoopScrollStrategy()
    });
  }

}
