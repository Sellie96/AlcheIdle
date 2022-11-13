import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { UpdateWoodcutting } from 'src/app/stateManagement/character/character.actions';
import { CharacterState } from 'src/app/stateManagement/character/character.state';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { SkillsService } from '../skills.service';
import { oreTypes, Ore, oreTypesToMine, lockedOres } from './Mining';

@UntilDestroy()
@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss']
})
export class MiningComponent implements OnInit {
  miningProgress = 0;
  curSec: number = 0;
  type: string = '';
  miningXp: number = 0;
  oreTypes = oreTypes;
  sub: any;
  oreActive: boolean = false;
  playerCharacter!: PlayerData;
  activeOre!: Ore;
  miners: number = 0;
  oreTypesToMine: Ore[] = oreTypesToMine;
  lockedOres: number[] = lockedOres;

  ores = oreTypes;

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

  startTimer(ore: Ore) {
    this.activeOre = ore;
    if (this.playerCharacter.character.skills.mining.level >= ore.level) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      const time = ((ore.time * 10) * (this.playerCharacter.character.skills.mining.tool!.bonus || 1)).toFixed(1);
      const timer$ = interval(50);

      this.sub = timer$.subscribe(async (sec) => {
        this.miningProgress = 0 + (sec * 50) / +time;
        this.curSec = sec / 2;
        if (this.curSec >= +time) {
          this.sub.unsubscribe();
          setTimeout (() => {
            this.miningProgress = 0;
            this.completeMining(ore);
         }, 250);
        }
      });
    } else return;
  }

  async completeMining(ore: Ore) {
    this.skillsService.skillingActive(this.playerCharacter.username, ore);

    await this.skillsService.getSkillingUpdate().then((data: any) => {
      this.setPlayerData(data.miningUsers.user);
      this.toastr.info(data.updateMessage, 'Update', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });
    });

    setTimeout (() => {
      this.startTimer(ore);
   }, 250);
  }
}
