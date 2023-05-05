import { ActivatedRoute, Router } from '@angular/router';
import { CombatService } from './../../combat.service';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-choose-monster',
  templateUrl: './choose-monster.component.html',
  styleUrls: ['./choose-monster.component.scss'],
})
export class ChooseMonsterComponent implements OnInit {

  monsterList: any;

  monstersInArea: any[] = [];

  selectedIndex: number = 0;

  constructor(private combatService: CombatService, private route: ActivatedRoute, private router: Router) { 
    this.combatService.getMonsterListData().pipe(take(1)).subscribe((monsterList: any) => {
      this.monsterList = monsterList;

      this.route.queryParams.subscribe((params: any) => {

        let areaSelected: number;
  
        switch (params.area) {
          case 'Overgrown Farm':
            areaSelected = 0;
            break;
          case 'Goblin Camp':
            areaSelected = 1;
            break;
          case 'Chaotic Beach':
            areaSelected = 2;
            break;
          case 'Frozen Wastes':
            areaSelected = 3;
            break;
          case 'Mystic Forest':
            areaSelected = 4;
            break;
          case 'Volcanic Plains':
            areaSelected = 5;
            break;
          default:
            areaSelected = 0;
            break;
        }
  
        let monsterList = this.monsterList.filter((monster: any) => monster.area === areaSelected);
        this.monstersInArea = monsterList;
      });
    });
  }

  ngOnInit() {
  }


  setSelectedIndex(index: number) {
    this.selectedIndex = index;
  }

  chooseArea(areaName: string) {
    this.router.navigate(['/combat/CombatArea/Monsters'], { queryParams: { area: areaName } });
  }

  fightMonster(monsterName: string) {
    this.router.navigate(['/combat/CombatArea/Fighting'], { queryParams: { monster: monsterName } });
  }



}
