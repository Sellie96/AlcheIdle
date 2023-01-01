import { Component, OnInit, ViewChild } from '@angular/core';
import { IonProgressBar, ItemReorderEventDetail } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { CharacterState } from 'src/app/state/character.state';
import { PlayerData } from 'src/app/state/CharacterDataTypes';
import { CombatService } from './combat.service';

@UntilDestroy()
@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
})
export class CombatComponent implements OnInit {
  @ViewChild(IonProgressBar) progressBar!: IonProgressBar;

  showCombatAreas = false;
  equipment = true;
  backpack = false;
  items = false;

  isModalOpen = false;

  lootMonster!: any;

  autoFight = true;

  monster!: any;
  monsterList: any[] = []

  playerCharacter!: PlayerData;

  monsterTimeUntilFinish = 0;
  timeUntilFinish = 0;
  AttackSpeed = 0;

  constructor(
    private store: Store,
    private combatService: CombatService,
  ) { }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  ngOnInit() {
    this.store
    .select((state) => CharacterState.selectCharacterStats(state.character))
    .pipe(untilDestroyed(this))
    .subscribe((character: PlayerData) => {
      this.playerCharacter = JSON.parse(JSON.stringify(character));
    });


    this.combatService.monsterData().subscribe((monster: any) => {
      if (monster?.health <= 0) {
        this.monster = undefined;
        if (this.autoFight) {
          setTimeout(() => {
            this.combatService.startMonsterCombat(monster);
            this.monster = monster;
            console.log(this.monster);
          }, 500);
        }
      } else {
        this.monster = monster;
        this.timeUntilFinish = Math.floor(Date.now() / 1000) + this.playerCharacter.character.combatStats.combat.attackSpeed;;
      }
    });


    this.combatService.getMonsterListData().subscribe((monsterList: any) => {
      console.log(monsterList);
      this.monsterList = monsterList;
    });

    this.combatService.playerData().subscribe((player: any) => {
      this.monsterTimeUntilFinish = Math.floor(Date.now() / 1000) + (4);
      this.playerCharacter = player;
    });
  }

  spawnMonster(monster: string) {
    this.combatService.startMonsterCombat(monster);
    this.monsterTimeUntilFinish = Math.floor(Date.now() / 1000) + (4);
    this.timeUntilFinish = Math.floor(Date.now() / 1000) + this.playerCharacter.character.combatStats.combat.attackSpeed;
  }

  setOpen(isOpen: boolean, monster: any) {
    this.lootMonster = monster;
    this.isModalOpen = isOpen;
  }

  flee() {
    console.log('flee');
    this.combatService.flee();
    this.timeUntilFinish = 0;
    this.monsterTimeUntilFinish = 0;
    this.monster = undefined;
  }

  getMonsterListData() {
    this.combatService.getMonsterListData();
  }

}
