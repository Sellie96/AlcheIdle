import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { UpdateWoodcutting } from 'src/app/stateManagement/character.actions';
import { CharacterState } from 'src/app/stateManagement/character.state';
import { PlayerData } from 'src/app/stateManagement/CharacterDataTypes';
import { ChatService } from '../../chat/chat.service';
import { SkillsService } from '../skills.service';
import { LogNames, logTypes, Tree, TreeNames, Trees, treeTypes } from './Trees';


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
  logTypes = logTypes;
  sub: any;
  treeActive: boolean = false;
  playerCharacter!: PlayerData;
  activeTree: string = '';

  trees = treeTypes;

  constructor(private store: Store, private toastr: ToastrService, private chatService: ChatService, private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.store
    .select((state) => CharacterState.selectCharacterStats(state.character))
    .pipe(untilDestroyed(this))
    .subscribe((character: PlayerData) => {
      this.playerCharacter = JSON.parse(JSON.stringify(character));
    });


    this.skillsService.woodcuttingActive(this.playerCharacter.username, 'tree');
  }

  startTimer(tree: Tree) {
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
    switch (tree.name) {
      case TreeNames.tree:
        if(this.playerCharacter.character.backpack.some(logs => logs.name === LogNames.logs)) {

          let indexOfItem = this.playerCharacter.character.backpack.findIndex(logs => logs.name === LogNames.logs);

          this.playerCharacter.character.backpack.push({name: LogNames.logs, amount: this.playerCharacter.character.backpack[indexOfItem].amount += 1, type: LogNames.logs});

          this.playerCharacter.character.backpack.splice(indexOfItem, 1);

      } else {
        this.playerCharacter.character.backpack.push({
          name: LogNames.logs,
          amount: 1,
          type: LogNames.logs,
        });
      }
        break;
      case TreeNames.oak:
        this.logTypes.oak ++;
        break;
      case TreeNames.willow:
        this.logTypes.willow ++;
        break;
      case TreeNames.bonsai:
        this.logTypes.bonsai ++;
        break;
      case TreeNames.yew:
        this.logTypes.yew ++;
        break;
      case TreeNames.magic:
        this.logTypes.magic ++;
        break;
      case TreeNames.demon:
        this.logTypes.demon ++;
        break;
      case TreeNames.divine:
        this.logTypes.divine ++;
        break;
      default:
        break;
    }
    this.toastr.info('+' + tree.xp + ' XP' + '  ' + 1 + tree.logs, 'Reward' ,{
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'increasing'
    });
    if (this.woodcuttingXp >= 10 * this.playerCharacter.character.skills.woodcutting.level) {
      this.playerCharacter.character.skills.woodcutting.level++;
      this.chatService.sendSkillUpdate(`Test just advanced to level ${this.playerCharacter.character.skills.woodcutting.level} Woodcutting!`);
      this.store.dispatch(new UpdateWoodcutting(this.playerCharacter));
      this.woodcuttingXp = 0;
    }

    this.startTimer(tree);
  }
}
