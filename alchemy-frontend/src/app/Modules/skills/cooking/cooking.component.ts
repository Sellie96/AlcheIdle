import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { UpdateWoodcutting } from 'src/app/stateManagement/character/character.actions';
import { CharacterState } from 'src/app/stateManagement/character/character.state';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { FiremakingLogNames } from '../firemaking/Firemaking';
import { FishNames } from '../fishing/Fishing';
import { SkillsService } from '../skills.service';
import { logTypes, Tree, treeTypesToChop, lockedTrees, LogNames, treeTypes } from '../woodcutting/Trees';
import { CookingFishNames } from './Fishing';

@UntilDestroy()
@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.component.html',
  styleUrls: ['./cooking.component.scss']
})
export class CookingComponent implements OnInit {
  cookingForm: FormGroup = new FormGroup({});

  timeUntilFinish = Math.floor(Date.now() / 1000) + 4;

  type: string = '';
  treeActive: boolean = false;
  playerCharacter!: PlayerData;
  activeTree!: Tree;
  woodcutters: number = 0;

  fishInStorage: number = 0;
  fishNames = CookingFishNames;
  currentFishSelected = {
    name: FishNames.prawn,
    skillType: 'cooking',
    level: 1,
    xp: 40,
    reward: 1,
    time: 4,
    value: '0',
    amount: 0,
  };

  cookingActive = false;

  trees = treeTypes;

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private skillsService: SkillsService,
    private elementRef: ElementRef
  ) {
    this.cookingForm = new FormGroup({
      fish: new FormControl(FishNames.prawn, [Validators.required]),
    });
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {
    this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(untilDestroyed(this))
      .subscribe((character: PlayerData) => {
        this.playerCharacter = JSON.parse(JSON.stringify(character));
      });

    let test = this.playerCharacter.character.backpack.filter(
      (item) => item.name.toLowerCase() === FishNames.prawn.toLowerCase()
    );

    this.fishInStorage = test[0].amount;

    this.cookingForm.get('fish')!.valueChanges.subscribe((val) => {
        this.currentFishSelected =
          this.playerCharacter.character.backpack.filter(
            (item) => item.name.toLowerCase() === val
          )[0];

        this.fishInStorage = this.currentFishSelected.amount;
      });
  }

  setPlayerData(playerData: any) {
    this.store.dispatch(new UpdateWoodcutting(playerData));
  }

  async completeCooking() {
    this.skillsService.skillingActive(
      this.playerCharacter.username,
      this.currentFishSelected
    );

    await this.skillsService.getSkillingUpdate().then((data: any) => {
      this.setPlayerData(data.cookingUsers.user);
      this.toastr.info(data.updateMessage, 'Update', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });

    });

      let test = this.playerCharacter.character.backpack.filter(
      (item) => item.name.toLowerCase() === FishNames.prawn.toLowerCase()
    );

    this.fishInStorage = test[0].amount;

    if(this.fishInStorage > 0) {
      this.resetTimer();
    }
  }

  resetTimer() {
    this.timeUntilFinish =
      Math.floor(Date.now() / 1000) + this.currentFishSelected.time;
  }

  activateCooking() {
    if(this.fishInStorage > 0) {
      this.cookingActive = !this.cookingActive;
      this.resetTimer();
    }
  }
}
