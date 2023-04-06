import { PlayerData } from './../../state/CharacterDataTypes';
import {
  UpdateCharacter,
  CreateCharacter,
} from './../../state/character.actions';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonProgressBar, ItemReorderEventDetail } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { CharacterState } from 'src/app/state/character.state';
import { CombatService } from './combat.service';
import { BackpackService } from './backpack/backpack.service';

@UntilDestroy()
@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
})
export class CombatComponent implements OnInit, OnDestroy {
  @ViewChild(IonProgressBar) progressBar!: IonProgressBar;

  showCombatAreas = false;
  equipment = true;
  backpack = false;
  items = false;
  loading = false;

  isModalOpen = false;

  lootMonster!: any;

  autoFight = true;

  monster!: any;
  monsterList: any[] = [];

  playerCharacter!: PlayerData;

  monsterTimeUntilFinish = 0;
  timeUntilFinish = 0;
  AttackSpeed = 0;

  type: string = 'statistics';
  type2: string = '';

  showMonsterHpChange = false;
  monsterHpChanged = 0;

  showCharacterHpChange = false;
  characterHpChanged = 0;

  constructor(
    private store: Store,
    private combatService: CombatService,
    private backpackService: BackpackService
  ) {}

  ngOnDestroy(): void {
    this.combatService.flee();
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  async ngOnInit() {
    this.combatService.flee();

    this.combatService.playerData().subscribe((player) => {
      this.playerCharacter = player;
      this.store.dispatch(new CreateCharacter(player));
    });

    this.store
      .select(CharacterState.selectCharacterStats)
      .pipe(untilDestroyed(this))
      .subscribe((character) => {
        this.playerCharacter = JSON.parse(JSON.stringify(character));
      });

    this.combatService.getMonsterListData().subscribe((monsterList: any) => {
      this.monsterList = monsterList;
    });

    this.combatService.getUpdatedMonster().subscribe(async (updatedMonster) => {
      const { monster } = updatedMonster;
      const currentMonsterHealth = this.monster?.health ?? 0;
      const updatedMonsterHealth = monster.health;

      if (updatedMonsterHealth <= 0) {
        this.loading = true;
        this.monster = undefined;


        if (this.autoFight) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          this.combatService.startMonsterCombat(monster);
          this.loading = false;
        }
      } else {
        if (monster.maxHealth !== monster.health) {
          this.displayHpChange(
            'monster',
            currentMonsterHealth - updatedMonsterHealth
          );
        }

        this.monster = monster;
        this.timeUntilFinish =
          Math.floor(Date.now() / 1000) +
          this.playerCharacter.character.combatStats.combat.attackSpeed;
      }
    });

    this.combatService.getUpdatedPlayer().subscribe((updatedPlayer: any) => {
      const { player } = updatedPlayer;
      const { combatStats } = player.character;
      const { health } = combatStats.stats;

      this.monsterTimeUntilFinish =
        Math.floor(Date.now() / 1000) + (this.monster?.attackSpeed ?? 4);

      const hpChange = this.calculateHpChange(health);
      if (hpChange !== 0) {
        this.displayHpChange('character', hpChange);
      }
    });
  }

  private calculateHpChange(updatedHealth: number): number {
    const currentHealth =
      this.playerCharacter.character.combatStats.stats.health;
    return currentHealth - updatedHealth;
  }

  spawnMonster(monster: string) {
    this.loading = true;
    this.combatService.startMonsterCombat(monster);
    this.monsterTimeUntilFinish = Math.floor(Date.now() / 1000) + 4;
    this.timeUntilFinish =
      Math.floor(Date.now() / 1000) +
      this.playerCharacter.character.combatStats.combat.attackSpeed;

    setTimeout(() => {
      this.loading = false;
    }, 500);
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

  displayHpChange(entityType: string, hpChange: number) {
    if (entityType === 'monster') {
      this.showMonsterHpChange = true;
      this.monsterHpChanged = hpChange;
      setTimeout(() => {
        this.showMonsterHpChange = false;
      }, 2000);
    } else if (entityType === 'character') {
      this.showCharacterHpChange = true;
      this.characterHpChanged = hpChange;
      setTimeout(() => {
        this.showCharacterHpChange = false;
      }, 2000);
    }
  }

  getMonsterHpChange() {
    return this.monsterHpChanged;
  }

  getCharacterHpChange() {
    return this.characterHpChanged;
  }

  calculateChanceToHit() {
    const monsterAccuracy = this.monster?.accuracy ?? 0;
    const playerEvasion =
      this.playerCharacter?.character?.combatStats?.defenses?.evasion ?? 0;

    if (!this.monster) {
      return '-';
    }

    if (monsterAccuracy <= playerEvasion) {
      return ((monsterAccuracy / (2 * playerEvasion)) * 100).toFixed(0);
    }

    return ((1 - playerEvasion / (monsterAccuracy * 2)) * 100).toFixed(0);
  }

  unequipItem(type: string) {
    this.backpackService.unequipItem(type);
  }

  showBackup(filename: string, extension: string) {
    console.log(this.showBackup);
    return filename + '.' + extension;
  }
}
