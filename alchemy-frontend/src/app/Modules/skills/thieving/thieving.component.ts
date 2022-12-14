import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { UpdateWoodcutting } from 'src/app/stateManagement/character/character.actions';
import { CharacterState } from 'src/app/stateManagement/character/character.state';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { SkillsService } from '../skills.service';
import { lockedTargets, Thieving, thievingOptions, thievingTargets } from './Thieving';

@Component({
  selector: 'app-thieving',
  templateUrl: './thieving.component.html',
  styleUrls: ['./thieving.component.scss'],
})
@UntilDestroy()
export class ThievingComponent implements OnInit {
  sub: any;
  activeThieving!: Thieving;
  playerCharacter!: PlayerData;
  thievingProgress = 0;
  curSec: number = 0;
  thiefs: number = 0;
  thievingTargets = thievingTargets;
  lockedTargets = lockedTargets;

  thievingOptions = thievingOptions;

  constructor(
    private elementRef: ElementRef,
    private skillsService: SkillsService,
    private store: Store,
    private toastr: ToastrService
  ) {}

  @HostListener('unloaded')
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
    if (this.sub) {
      this.sub.unsubscribe();
    }
    console.log('Items destroyed');
  }

  ngOnInit(): void {
    this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(untilDestroyed(this))
      .subscribe((character: PlayerData) => {
        this.playerCharacter = JSON.parse(JSON.stringify(character));
      });
  }

  startTimer(thievingTarget: Thieving) {
    this.activeThieving = thievingTarget;
    if (
      this.playerCharacter.character.skills.thieving.level >=
      thievingTarget.level
    ) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      const time = thievingTarget.time * 10;
      const timer$ = interval(100);

      this.sub = timer$.subscribe((sec) => {
        this.thievingProgress = 0 + (sec * 100) / time;
        this.curSec = sec;
        if (this.curSec === time) {
          this.sub.unsubscribe();
          setTimeout (() => {
            this.thievingProgress = 0;
            this.completeThieving(thievingTarget);
         }, 250);
        }
      });
    } else return;
  }

  async completeThieving(thief: Thieving) {
    this.skillsService.skillingActive(this.playerCharacter.username, thief);

    await this.skillsService.getSkillingUpdate().then((data: any) => {
      this.setPlayerData(data.thievingUsers.user);
      this.toastr.info(data.updateMessage, 'Update', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });
    });

    setTimeout (() => {
      this.startTimer(thief);
   }, 250);
  }

  setPlayerData(playerData: any) {
    this.store.dispatch(new UpdateWoodcutting(playerData));
  }
}
