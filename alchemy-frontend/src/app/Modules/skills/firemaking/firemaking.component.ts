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
  currentLogSelected = {
    name: LogNames.logs,
    skillType: 'firemaking',
    level: 1,
    xp: 40,
    reward: 1,
    time: 4,
    value: '0',
    amount: 0,
  };

  burningActive = false;

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

    let test = this.playerCharacter.character.backpack.filter(
      (item) => item.name.toLowerCase() === LogNames.logs.toLowerCase()
    );

     if(test.length > 0) {
      this.logsInStorage = test[0].amount;
    } else { this.logsInStorage = 0 }

    this.firemakingForm.setValue({
      logs: LogNames.logs,
    });

    this.firemakingForm
      .get(LogNames.logs.toLowerCase())!
      .valueChanges.subscribe((val) => {
        this.currentLogSelected =
          this.playerCharacter.character.backpack.filter(
            (item) => item.name.toLowerCase() === val
          )[0];

        this.logsInStorage = this.currentLogSelected.amount;
      });
  }

  setPlayerData(playerData: any) {
    this.store.dispatch(new UpdateWoodcutting(playerData));
  }

  async completeFiremaking() {
    this.skillsService.skillingActive(
      this.playerCharacter.username,
      this.currentLogSelected
    );

    await this.skillsService.getSkillingUpdate().then((data: any) => {
      this.setPlayerData(data.firemakingUsers.user);
      this.toastr.info(data.updateMessage, 'Update', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });

    });

      let test = this.playerCharacter.character.backpack.filter(
      (item) => item.name.toLowerCase() === LogNames.logs.toLowerCase()
    );

    this.logsInStorage = test[0].amount;

    if(this.logsInStorage > 0) {
      this.resetTimer();
    }
  }

  resetTimer() {
    this.timeUntilFinish =
      Math.floor(Date.now() / 1000) + this.currentLogSelected.time;
  }

  activateBurn() {
    if(this.logsInStorage > 0) {
      this.burningActive = !this.burningActive;
      this.resetTimer();
    }
  }
}
