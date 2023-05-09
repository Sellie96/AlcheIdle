import { OverlayEventDetail } from '@ionic/core/components';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { PlayerData } from 'src/app/state/CharacterDataTypes';
import { CharacterState } from 'src/app/state/character.state';
import { BackpackService } from './backpack.service';
import { IonModal } from '@ionic/angular';
import { RPGItems } from '../../../../../../alchemy-backend/src/Modules/combat/items.service';
import { CombatService } from '../combat.service';
import { take } from 'rxjs';
import { UpdateCharacter } from 'src/app/state/character.actions';

@UntilDestroy()
@Component({
  selector: 'app-backpack',
  templateUrl: './backpack.component.html',
  styleUrls: ['./backpack.component.scss'],
})
export class BackpackComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  playerCharacter!: PlayerData;
  isModalItemCompareOpen = false;
  selectedItem!: RPGItems;
  equippedItem!: RPGItems;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  
  constructor(
    private store: Store,
    private backpackService: BackpackService,
    private combatService: CombatService
    ) { }

  ngOnInit() {
    this.store
    .select((state) => CharacterState.selectCharacterStats(state.character))
    .pipe(untilDestroyed(this))
    .subscribe((character: PlayerData) => {
      this.playerCharacter = JSON.parse(JSON.stringify(character));
    });
  }


  equipItem(item: RPGItems) {
    this.backpackService.equipItem(item);

    this.combatService
    .playerData()
    .pipe(take(1))
    .subscribe((player) => {
      this.playerCharacter = player;
      this.store.dispatch(new UpdateCharacter(player));
    })
    .unsubscribe();
  }

  sellItem(item: RPGItems) {
    this.backpackService.sellItem(item, 1);

    this.combatService
    .playerData()
    .pipe(take(1))
    .subscribe((player) => {
      this.playerCharacter = player;
      this.store.dispatch(new UpdateCharacter(player));
    })
    .unsubscribe();

    return this.modal.dismiss(null, 'cancel');
  }

  useItem(item: RPGItems, amount: number) {
    this.backpackService.useItem(item, amount);

    this.combatService
    .playerData()
    .pipe(take(1))
    .subscribe((player) => {
      this.playerCharacter = player;
      this.store.dispatch(new UpdateCharacter(player));
    })
    .unsubscribe();
  }

  async openModal() {
    this.modal.present();

    const { data, role } = await this.modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  cancel() {
    return this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.equipItem(this.selectedItem);
    return this.modal.dismiss(this.name, 'confirm');
  }

  setItem(item: any) {
    this.selectedItem = item;
    this.getItemType(item);
    this.openModal();
  }

  getItemType(item: any) {
    switch (item.itemType.toLowerCase()) {
      case 'weapon': this.equippedItem =
      this.playerCharacter.character.equipment.mainHand;
       break;
      case 'shield': this.equippedItem = this.playerCharacter.character.equipment.offHand; break;
      case 'helmet': this.equippedItem = this.playerCharacter.character.equipment.head; break;
      case 'chest': this.equippedItem = this.playerCharacter.character.equipment.chest; break;
      case 'legs': this.equippedItem = this.playerCharacter.character.equipment.legs; break;
      case 'boots': this.equippedItem = this.playerCharacter.character.equipment.feet; break;
      case 'gloves': this.equippedItem = this.playerCharacter.character.equipment.hands; break;
      case 'ring1': this.equippedItem = this.playerCharacter.character.equipment.ring1; break;
      case 'ring2': this.equippedItem = this.playerCharacter.character.equipment.ring2; break;
      case 'necklace': this.equippedItem = this.playerCharacter.character.equipment.neck; break;
      default: this.equippedItem = this.playerCharacter.character.equipment.mainHand; break;
    }
  }

}
