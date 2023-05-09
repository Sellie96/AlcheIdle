import { PlayerData } from './../../state/CharacterDataTypes';
import {
  UpdateCharacter,
  CreateCharacter,
} from './../../state/character.actions';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { IonProgressBar, ItemReorderEventDetail } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { CharacterState } from 'src/app/state/character.state';
import { CombatService } from './combat.service';
import { BackpackService } from './backpack/backpack.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/utils/toast.service';
import { Subject, Subscription, map, take, takeUntil, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
})
export class CombatComponent implements OnInit, OnDestroy {
  @ViewChild(IonProgressBar) progressBar!: IonProgressBar;

  loading = false;

  isModalOpen = false;
  isModalItemCompareOpen = false;

  lootMonster!: any;

  autoFight = true;

  monster!: any;

  playerCharacter!: PlayerData;

  type: string = 'backpack';
  type2: string = '';

  showMonsterHpChange = false;
  monsterHpChanged = 0;

  showCharacterHpChange = false;
  characterHpChanged = 0;

  showNewLoot = false;
  newLoot: any;

  progressInterval: any;
  progress: number = 0;

  monsterProgressInterval: any;
  monsterProgress: number = 0;

  monsterSubscription: Subscription = new Subscription();
  lootSubscription: Subscription = new Subscription();
  playerSubscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private combatService: CombatService,
    private backpackService: BackpackService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnDestroy(): void {
    this.combatService.flee();
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  async ngOnInit() {
    await this.initializeCombat();
  }

  startProgressBar(): void {
    clearInterval(this.progressInterval);
    this.progress = 0;
    const interval = 100; // ms

    const step =
      (interval /
        (this.playerCharacter.character.combatStats.combat.attackSpeed *
          1000)) *
      100;

    this.progressInterval = setInterval(() => {
      if (!this.loading) {
        this.progress += step;

        if (this.progress >= 100) {
          this.progress = 100;
        }
      }
    }, interval);
  }

  startMonsterProgressBar(): void {
    clearInterval(this.monsterProgressInterval);
    this.monsterProgress = 0;

    let duration = this.monster?.attackSpeed;

    const interval = 100; // ms
    const step = (interval / (duration * 1000)) * 100;

    this.monsterProgressInterval = setInterval(() => {
      if (!this.loading) {
        this.monsterProgress += step;

        if (this.monsterProgress >= 94) {
          this.monsterProgress = 100;
          clearInterval(this.monsterProgressInterval);
        }
      }
    }, interval);
  }

  async initializeCombat() {
    this.combatService.flee();

    this.subscribeToLootUpdates();
    this.subscribeToLevelUpdates();

    this.combatService
      .playerData()
      .pipe(untilDestroyed(this))
      .subscribe((player) => {
        this.playerCharacter = player;
        this.store.dispatch(new UpdateCharacter(player));
      });

    this.store
      .select(CharacterState.selectCharacterStats)
      .pipe(untilDestroyed(this))
      .subscribe((character) => {
        this.playerCharacter = JSON.parse(JSON.stringify(character));
      });

    this.combatService
      .getMonsterListData()
      .pipe(take(1))
      .subscribe((monsterList: any) => {
        this.route.queryParams.subscribe((params: any) => {
          this.monster = monsterList.find(
            (m: { name: string }) => m.name === params.monster
          );
        });
      });

    this.route.queryParams.pipe(take(1)).subscribe((params: any) => {
      this.spawnMonster(params.monster);
    });
  }

  private calculateHpChange(updatedHealth: number): number {
    const currentHealth =
      this.playerCharacter.character.combatStats.stats.health;
    return currentHealth - updatedHealth;
  }

  spawnMonster(monster: string) {
    this.loading = true;
    this.progress = 0;
    clearInterval(this.progressInterval);
    this.monsterProgress = 0;
    clearInterval(this.monsterProgressInterval);

    //clear subscriptions
    this.monsterSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
    this.subscribeToMonsterUpdates();
    this.subscribeToPlayerUpdates();


    setTimeout(() => {
      this.loading = false;
      this.combatService.startMonsterCombat(monster);
      this.startMonsterProgressBar();
    }, 1500);
  }

  setOpen(isOpen: boolean, monster: any) {
    this.lootMonster = monster;
    this.isModalOpen = isOpen;
  }

  flee() {
    this.combatService.flee();
    this.router.navigate(['/app/Town/Main']);
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

  calculateChanceToHit(): number {
    const monsterAccuracy = this.monster?.accuracy ?? 0;
    const playerEvasion =
      this.playerCharacter?.character?.combatStats?.defenses?.evasion ?? 0;

    if (!this.monster) {
      return 0;
    }

    if (monsterAccuracy <= playerEvasion) {
      return (monsterAccuracy / (2 * playerEvasion)) * 100;
    }

    return (1 - playerEvasion / (monsterAccuracy * 2)) * 100;
  }

  calculatePlayerChanceToHit(): number {
    const playerAccuracy =
      this.playerCharacter.character.combatStats.combat.accuracy ?? 0;
    const monsterEvasion = this.monster?.evasion ?? 0;

    if (!this.monster) {
      return 0;
    }

    if (playerAccuracy <= monsterEvasion) {
      return (playerAccuracy / (2 * monsterEvasion)) * 100;
    }

    return (1 - monsterEvasion / (playerAccuracy * 2)) * 100;
  }

  unequipItem(type: string) {
    this.backpackService.unequipItem(type);
  }

  showLoot(loot: any) {
    this.showNewLoot = true;
    this.newLoot = loot;
    setTimeout(() => {
      this.showNewLoot = false;
    }, 2000);
  }

  calculateXpForLevel() {
    let total = 0;
    for (
      let i = 0;
      i < this.playerCharacter.character.combatStats.progression.level;
      i++
    ) {
      total += Math.floor(i + 300 * Math.pow(2, i / 7));
    }

    if (
      this.playerCharacter.character.combatStats.progression.experiencePoints >=
      total
    ) {
      this.playerCharacter.character.combatStats.progression.level++;
    }

    return total;
  }

  private subscribeToMonsterUpdates() {
    this.monsterSubscription = this.combatService
      .getUpdatedMonster()
      .pipe(untilDestroyed(this))
      .subscribe(async (updatedMonster) => {
        const { monster } = updatedMonster;
        const currentMonsterHealth = this.monster?.health ?? 0;
        const updatedMonsterHealth = monster.health;

        if (updatedMonsterHealth <= 0) {
          this.spawnMonster(monster.name);
        } else {
          if (monster.maxHealth !== monster.health) {
            this.displayHpChange(
              'monster',
              currentMonsterHealth - updatedMonsterHealth
            );
          }

          this.monster = monster;
          this.progress = 0;
          clearInterval(this.progressInterval);
          this.startProgressBar();
        }
      });
  }

  private subscribeToLootUpdates() {
    this.lootSubscription = this.combatService
      .getMonsterLoot()
      .pipe(untilDestroyed(this))
      .subscribe((loot: any) => {
        this.showLoot(loot);
      });
  }

  private subscribeToPlayerUpdates() {
    this.playerSubscription = this.combatService
      .getUpdatedPlayer()
      .pipe(untilDestroyed(this))
      .subscribe((updatedPlayer) => {
        const player = updatedPlayer;
        const { combatStats } = player.character;
        const { health } = combatStats.stats;

        const hpChange = this.calculateHpChange(health);
        if (hpChange !== 0) {
          this.displayHpChange('character', hpChange);
        }

        this.playerCharacter = player;
        this.store.dispatch(new UpdateCharacter(player));

        this.monsterProgress = 0;
        clearInterval(this.monsterProgressInterval);
        this.startMonsterProgressBar();
      });
  }

  private subscribeToLevelUpdates() {
    this.combatService
      .checkIfLevelUp()
      .pipe(untilDestroyed(this))
      .subscribe((levelUp: boolean) => {
        console.log(levelUp);
        if (levelUp) {
        }
      });
  }
}
