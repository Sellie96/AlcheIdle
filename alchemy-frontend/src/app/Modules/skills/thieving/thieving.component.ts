import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { UpdateWoodcutting } from 'src/app/stateManagement/character/character.actions';
import { CharacterState } from 'src/app/stateManagement/character/character.state';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { SkillsService } from '../skills.service';
import { Thieving, thievingOptions } from './Thieving';

@Component({
  selector: 'app-thieving',
  templateUrl: './thieving.component.html',
  styleUrls: ['./thieving.component.scss'],
})
@UntilDestroy()
export class ThievingComponent implements OnInit {
  sub: any;
  activeThieving!: string;
  playerCharacter!: PlayerData;
  thievingProgress = 100;
  curSec: number = 0;
  thiefs: number = 0;

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

      this.intializeThieving();
  }

  intializeThieving() {
    this.skillsService.getThiefs().subscribe((thiefs: any) => {
      this.thiefs = thiefs;
    });
  }

  startTimer(thievingTarget: Thieving) {
    this.activeThieving = thievingTarget.name;
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
        this.thievingProgress = 100 - (sec * 100) / time;
        this.curSec = sec;
        if (this.curSec === time) {
          this.sub.unsubscribe();
          this.completeThieving(thievingTarget);
        }
      });
    } else return;
  }

  async completeThieving(thief: Thieving) {
    this.skillsService.thievingActive(this.playerCharacter.username, thief);

    await this.skillsService.getThievingUpdate().then((data: any) => {
      this.setPlayerData(data.thievingUsers.user);
      this.toastr.info(data.updateMessage, 'Update', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });
    });

    this.startTimer(thief);
  }

  setPlayerData(playerData: any) {
    this.store.dispatch(new UpdateWoodcutting(playerData));
  }

  getExperiencePointsForLevel() {
    let points = 0;
    let output = 0;
    for (
      let lvl = 1;
      lvl <= this.playerCharacter.character.skills.thieving.level;
      lvl++
    ) {
      points += Math.floor(lvl + 300.0 * Math.pow(2.0, lvl / 7.0));
      if (lvl >= this.playerCharacter.character.skills.thieving.level) {
        return output;
      }
      output = Math.floor(points / 4);
    }
    return 0;
  }
}
