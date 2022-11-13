import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { UpdateWoodcutting } from 'src/app/stateManagement/character/character.actions';
import { CharacterState } from 'src/app/stateManagement/character/character.state';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { SkillsService } from '../skills.service';
import { Tree } from '../woodcutting/Trees';
import { Fish, fishTypesToCatch, lockedFish } from './Fishing';

@UntilDestroy()
@Component({
  selector: 'app-fishing',
  templateUrl: './fishing.component.html',
  styleUrls: ['./fishing.component.scss'],
})
export class FishingComponent implements OnInit {

  fishProgress = 0;
  curSec: number = 0;
  type: string = '';
  fishingXp: number = 0;
  sub: any;
  fishActive: boolean = false;
  playerCharacter!: PlayerData;
  activeFish!: Fish;
  fishers: number = 0;
  fishTypes: Fish[] = fishTypesToCatch;
  lockedFish: number[] = lockedFish;

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
  }

  setPlayerData(playerData: any) {
    this.store.dispatch(new UpdateWoodcutting(playerData));
  }

  startTimer(fish: Fish) {
    this.activeFish = fish;
    if (this.playerCharacter.character.skills.fishing.level >= fish.level) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      const time = fish.time * 10;
      const timer$ = interval(50);

      this.sub = timer$.subscribe(async (sec) => {
        this.fishProgress = 0 + (sec * 50) / +time;
        this.curSec = sec / 2;
        if (this.curSec >= +time) {
          this.sub.unsubscribe();
          setTimeout(() => {
            this.fishProgress = 0;
            this.completeFishing(fish);
          }, 250);
        }
      });
    } else return;
  }

  async completeFishing(fish: Fish) {
    this.skillsService.skillingActive(this.playerCharacter.username, fish);

    await this.skillsService.getSkillingUpdate().then((data: any) => {
      this.setPlayerData(data.fishingUsers.user);
      this.toastr.info(data.updateMessage, 'Update', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });
    });

    setTimeout(() => {
      this.startTimer(fish);
    }, 250);
  }
}
