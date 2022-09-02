import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { interval } from 'rxjs';
import { UpdateWoodcutting } from 'src/app/stateManagement/character.actions';
import { CharacterState } from 'src/app/stateManagement/character.state';
import { PlayerData } from 'src/app/stateManagement/CharacterDataTypes';
import { Logs, logTypes, Tree, Trees, treeTypes } from './Trees';
import { ToastrService } from 'ngx-toastr';


@UntilDestroy()
@Component({
  selector: 'app-woodcutting',
  templateUrl: './woodcutting.component.html',
  styleUrls: ['./woodcutting.component.scss'],
})
export class WoodcuttingComponent implements OnInit {
  treeProgress = 100;
  curSec: number = 0;
  type: string = '';
  woodcuttingXp: number = 0;
  woodcuttingLevel: number = 1;
  logTypes = logTypes;
  sub: any;
  treeActive: boolean = false;
  playerCharacter!: PlayerData;
  activeTree: string= '';

  trees = treeTypes;

  constructor(private snackBar: MatSnackBar, private store: Store) {}

  ngOnInit(): void {
    this.store
    .select((state) => CharacterState.selectCharacterStats(state.character))
    .pipe(untilDestroyed(this))
    .subscribe((character: PlayerData) => {
      this.playerCharacter = JSON.parse(JSON.stringify(character));
    });
  }

  startTimer(tree: Tree) {
    this.activeTree = tree.name;
    if (this.woodcuttingLevel >= tree.level) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      const time = tree.time * 10;
      const timer$ = interval(100);
      this.type = tree.name;

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
    switch (tree.name) {
      case 'tree':
        this.logTypes.logs ++;
        break;
      case 'oak':
        this.logTypes.oak ++;
        break;
      case 'willow':
        this.logTypes.willow ++;
        break;
      case 'bonsai':
        this.logTypes.bonsai ++;
        break;
      case 'yew':
        this.logTypes.yew ++;
        break;
      case 'magic':
        this.logTypes.magic ++;
        break;
      case 'demon':
        this.logTypes.demon ++;
        break;
      case 'divine':
        this.logTypes.divine ++;
        break;
      default:
        break;
    }
    this.snackBar.open('+' + tree.xp + ' XP' + '  ' + 1 + tree.logs, 'Close');
    if (this.woodcuttingXp >= 10 * this.woodcuttingLevel) {
      this.woodcuttingLevel++;
      this.playerCharacter.skills.woodcutting.level = this.woodcuttingLevel
      this.store.dispatch(new UpdateWoodcutting(this.playerCharacter));
      this.woodcuttingXp = 0;
    }

    this.startTimer(tree);
  }
}
