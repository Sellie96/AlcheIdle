import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { delay, interval } from 'rxjs';
import { UpdateWoodcutting } from 'src/app/stateManagement/character/character.actions';
import { CharacterState } from 'src/app/stateManagement/character/character.state';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { SkillsService } from '../skills.service';
import { logTypes, Tree, treeTypes } from './Trees';

@UntilDestroy()
@Component({
  selector: 'app-woodcutting',
  templateUrl: './woodcutting.component.html',
  styleUrls: ['./woodcutting.component.scss'],
})
export class WoodcuttingComponent implements OnInit, OnDestroy {
  treeProgress = 0;
  curSec: number = 0;
  type: string = '';
  woodcuttingXp: number = 0;
  logTypes = logTypes;
  sub: any;
  treeActive: boolean = false;
  playerCharacter!: PlayerData;
  activeTree!: Tree;
  woodcutters: number = 0;

  trees = treeTypes;

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private skillsService: SkillsService,
    private elementRef: ElementRef
  ) {}

  @HostListener('unloaded')
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(untilDestroyed(this))
      .subscribe((character: PlayerData) => {
        this.playerCharacter = JSON.parse(JSON.stringify(character));
      });

    this.getInitialData();
  }

  getExperiencePointsForLevel() {
    let points = 0;
    let output = 0;
      for (let lvl = 1; lvl <= this.playerCharacter.character.skills.woodcutting.level; lvl++) {
        points += Math.floor(lvl + 300.0 * Math.pow(2.0, lvl / 7.0));
          if (lvl >= this.playerCharacter.character.skills.woodcutting.level) {
              return output;
          }
          output = Math.floor(points / 4);
      }
      return 0;
  }

  getInitialData() {
    this.skillsService.getWoodcutters().subscribe((woodcutters: any) => {
      this.woodcutters = woodcutters;
    });
  }

  setPlayerData(playerData: any) {
    this.store.dispatch(new UpdateWoodcutting(playerData));
  }

  startTimer(tree: Tree) {
    this.activeTree = tree;
    if (this.playerCharacter.character.skills.woodcutting.level >= tree.level) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      const time = ((tree.time * 10) * this.playerCharacter.character.skills.woodcutting.tool!.bonus).toFixed(1);
      const timer$ = interval(50);

      this.sub = timer$.subscribe(async (sec) => {
        this.treeProgress = 0 + (sec * 50) / +time;
        this.curSec = sec / 2;
        if (this.curSec >= +time) {
          this.sub.unsubscribe();
          setTimeout (() => {
            this.treeProgress = 0;
            this.completeWoodcutting(tree);
         }, 250);
        }
      });
    } else return;
  }

  async completeWoodcutting(tree: Tree) {
    this.skillsService.woodcuttingActive(this.playerCharacter.username, tree);

    await this.skillsService.getWoodcuttingUpdate().then((data: any) => {
      this.setPlayerData(data.woodcuttingUsers.user);
      this.toastr.info(data.updateMessage, 'Update', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });
    });

    setTimeout (() => {
      this.startTimer(tree);
   }, 250);
  }
}
