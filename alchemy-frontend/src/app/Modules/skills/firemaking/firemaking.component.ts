import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { UpdateWoodcutting } from 'src/app/stateManagement/character/character.actions';
import { CharacterState } from 'src/app/stateManagement/character/character.state';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { SkillsService } from '../skills.service';
import {
  logTypes,
  Tree,
  treeTypesToChop,
  lockedTrees,
  treeTypes,
  LogNames,
} from '../woodcutting/Trees';
import { FiremakingLogNames } from './Firemaking';

@UntilDestroy()
@Component({
  selector: 'app-firemaking',
  templateUrl: './firemaking.component.html',
  styleUrls: ['./firemaking.component.scss'],
})
export class FiremakingComponent implements OnInit {
  firemakingForm: FormGroup = new FormGroup({});

  timeUntilFinish = Math.floor(Date.now() / 1000) + 4;

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
  treeTypes: Tree[] = treeTypesToChop;
  lockedTrees: number[] = lockedTrees;

  logsInStorage: number = 0;
  logNames = FiremakingLogNames;
  currentLogSelected = 'logs';

  trees = treeTypes;

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private skillsService: SkillsService,
    private elementRef: ElementRef
  ) {
    this.firemakingForm = new FormGroup({
      logs: new FormControl('', [Validators.required]),
    });
  }

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

    this.logsInStorage = this.playerCharacter.character.backpack.filter(
      (item) => item.name.toLowerCase() === "logs"
    ).length;

    this.firemakingForm.setValue({
      logs: 'logs',
    });

    this.firemakingForm.get('logs')!.valueChanges.subscribe((val) => {
      this.logsInStorage = this.playerCharacter.character.backpack.filter(
        (item) => item.name.toLowerCase() === val
      ).length;
      this.currentLogSelected = val;
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
      const time = (
        tree.time *
        10 *
        this.playerCharacter.character.skills.woodcutting.tool!.bonus
      ).toFixed(1);
      const timer$ = interval(50);

      this.sub = timer$.subscribe(async (sec) => {
        this.treeProgress = 0 + (sec * 50) / +time;
        this.curSec = sec / 2;
        if (this.curSec >= +time) {
          this.sub.unsubscribe();
          setTimeout(() => {
            this.treeProgress = 0;
            this.completeWoodcutting(tree);
          }, 250);
        }
      });
    } else return;
  }

  async completeWoodcutting(tree: Tree) {
    this.skillsService.skillingActive(this.playerCharacter.username, tree);

    await this.skillsService.getSkillingUpdate().then((data: any) => {
      this.setPlayerData(data.woodcuttingUsers.user);
      this.toastr.info(data.updateMessage, 'Update', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });
    });

    setTimeout(() => {
      this.startTimer(tree);
    }, 250);
  }

  resetTimer() {
    this.timeUntilFinish = Math.floor(Date.now() / 1000) + this.activeTree.time;
  }

  selectLogs() {}
}
