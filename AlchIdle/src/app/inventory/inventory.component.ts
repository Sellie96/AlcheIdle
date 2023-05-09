import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CharacterState } from '../state/character.state';
import { take } from 'rxjs';
import { PlayerData } from '../state/CharacterDataTypes';
import { BackpackService } from '../folder/combat/backpack/backpack.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

  playerCharacter!: PlayerData;

  segment: String = 'all';

  equippedItem: any = null;

  selectedItem: any = null;

  constructor(private store: Store, private backpackService: BackpackService) { }

  ngOnInit() {
    this.store
      .select(CharacterState.selectCharacterStats)
      .pipe(untilDestroyed(this))
      .subscribe((character) => {
        this.playerCharacter = JSON.parse(JSON.stringify(character));
      });
  }

  selectItem(item: any) {
    this.selectedItem = item;

    this.getItemType(item);
  }

  pinFormatter(value: number) {
    return `${value}`;
  }


  getItemType(item: any) {
    switch (item.itemType.toLowerCase()) {
      case 'weapon': this.equippedItem =
      this.playerCharacter.character.equipment.mainHand;
       break;
      case 'shield': this.equippedItem = this.playerCharacter.character.equipment.offHand; break;
      case 'helmet': this.equippedItem = this.playerCharacter.character.equipment.head; break;
      case 'body': this.equippedItem = this.playerCharacter.character.equipment.chest; break;
      case 'legs': this.equippedItem = this.playerCharacter.character.equipment.legs; break;
      case 'boots': this.equippedItem = this.playerCharacter.character.equipment.feet; break;
      case 'gloves': this.equippedItem = this.playerCharacter.character.equipment.hands; break;
      case 'ring1': this.equippedItem = this.playerCharacter.character.equipment.ring1; break;
      case 'ring2': this.equippedItem = this.playerCharacter.character.equipment.ring2; break;
      case 'necklace': this.equippedItem = this.playerCharacter.character.equipment.neck; break;
      default: this.equippedItem = this.playerCharacter.character.equipment.mainHand; break;
    }
  }

  equipItem(item: any) {
    this.backpackService.equipItem(item);

    this.selectedItem = null;
    this.equippedItem = null;
  }

  sellItem(item: any, amount: number) {
    this.backpackService.sellItem(item, amount);
    this.selectedItem = null;
    this.equippedItem = null;
  }

}
