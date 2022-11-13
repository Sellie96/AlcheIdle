import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { UpdateWoodcutting } from 'src/app/stateManagement/character/character.actions';
import { CharacterState } from 'src/app/stateManagement/character/character.state';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { SkillsService } from '../skills.service';
import { Course, coursesToRun, courseTypes, lockedCourses } from './Agility';

@UntilDestroy()
@Component({
  selector: 'app-agility',
  templateUrl: './agility.component.html',
  styleUrls: ['./agility.component.scss'],
})
export class AgilityComponent implements OnInit {
  agilityProgress = 0;
  curSec: number = 0;
  type: string = '';
  agilityXp: number = 0;
  courseTypes = courseTypes;
  sub: any;
  oreActive: boolean = false;
  playerCharacter!: PlayerData;
  activeCourse!: Course;
  runners: number = 0;
  coursesToRun: Course[] = coursesToRun;
  lockedCourses: number[] = lockedCourses;

  courses = courseTypes;

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

  startTimer(course: Course) {
    this.activeCourse = course;
    if (this.playerCharacter.character.skills.agility.level >= course.level) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      const time = (
        course.time *
        10 *
        (this.playerCharacter.character.skills.agility.tool!.bonus || 1)
      ).toFixed(1);
      const timer$ = interval(50);

      this.sub = timer$.subscribe(async (sec) => {
        this.agilityProgress = 0 + (sec * 50) / +time;
        this.curSec = sec / 2;
        if (this.curSec >= +time) {
          this.sub.unsubscribe();
          setTimeout(() => {
            this.agilityProgress = 0;
            this.completeAgility(course);
          }, 250);
        }
      });
    } else return;
  }

  async completeAgility(course: Course) {
    this.skillsService.skillingActive(this.playerCharacter.username, course);

    await this.skillsService.getSkillingUpdate().then((data: any) => {
      this.setPlayerData(data.agilityUsers.user);
      this.toastr.info(data.updateMessage, 'Update', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });
    });

    setTimeout(() => {
      this.startTimer(course);
    }, 250);
  }
}
