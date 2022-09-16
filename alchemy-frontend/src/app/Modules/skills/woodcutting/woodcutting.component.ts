import {
  Component, ElementRef,
  HostListener,
  OnDestroy,
  OnInit
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
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
  treeProgress = 100;
  curSec: number = 0;
  type: string = '';
  woodcuttingXp: number = 0;
  logTypes = logTypes;
  sub: any;
  treeActive: boolean = false;
  playerCharacter!: PlayerData;
  activeTree: string = '';
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
    console.log('Items destroyed');
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

  getInitialData() {
    this.skillsService.getWoodcutters().subscribe((woodcutters: any) => {
      this.woodcutters = woodcutters;
    });

    this.skillsService.getPlayerData().subscribe((playerData: any) => {
      this.setPlayerData(playerData);
    });
  }

  setPlayerData(playerData: any) {
    this.store.dispatch(new UpdateWoodcutting(playerData));
  }

  startTimer(tree: Tree) {
    this.skillsService.woodcuttingActive(this.playerCharacter.username, tree);

    this.activeTree = tree.name;
    if (this.playerCharacter.character.skills.woodcutting.level >= tree.level) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      const time = tree.time * 10;
      const timer$ = interval(100);

      this.sub = timer$.subscribe((sec) => {
        this.treeProgress = 100 - (sec * 100) / time;
        this.curSec = sec;
        if (this.curSec === time) {
          this.sub.unsubscribe();
          this.completeWoodcutting(tree);
        }
      });
    } else return;
  }

  completeWoodcutting(tree: Tree) {
    this.woodcuttingXp += tree.xp;
    this.toastr.info('+' + tree.xp + ' XP' + '  ' + 1 + tree.logs, 'Reward', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'increasing',
    });

    this.startTimer(tree);
  }
}
