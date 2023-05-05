import { ActivatedRoute, Router } from '@angular/router';
import { CombatService } from './../combat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-monster',
  templateUrl: './select-monster.component.html',
  styleUrls: ['./select-monster.component.scss'],
})
export class SelectMonsterComponent implements OnInit {

  isModalOpen = false;

  lootMonster!: any;

  type2: string = 'Forest';

  constructor(private router: Router) { }

  ngOnInit() {
  }


  setOpen(isOpen: boolean, monster: any) {
    this.lootMonster = monster;
    this.isModalOpen = isOpen;
  }

  fightMonster(areaName: string) {
    this.router.navigate(['/combat/CombatArea/Monsters'], { queryParams: { area: areaName } });
  }

  public appPages = [
    { title: 'Overgrown Farm', url: '/combat/CombatArea/Monsters', icon: 'lock-open', class: 'OvergrownFarm' },
    { title: 'Goblin Camp', url: '/combat/CombatArea/Monsters', icon: 'lock-open', class: 'GoblinCamp' },
    { title: 'Chaotic Beach', url: '/combat/CombatArea/Monsters', icon: 'lock-open', class: 'ChaoticBeach' },
    { title: 'Frozen Wastes', url: '/combat/CombatArea/Monsters', icon: 'lock-open', class: 'FrozenWastes' },
    { title: 'Mystic Forest', url: '/combat/CombatArea/Monsters', icon: 'lock-open', class: 'MysticForest' },
    { title: 'Volcanic Plains', url: '/combat/CombatArea/Monsters', icon: 'lock-open', class: 'VolcanicPlains' },
    { title: 'Locked', url: '/combat/CombatArea/Monsters', icon: 'lock-closed' },
    { title: 'Locked', url: '/combat/CombatArea/Monsters', icon: 'lock-closed' },
    { title: 'Locked', url: '/combat/CombatArea/Monsters', icon: 'lock-closed' },
    { title: 'Locked', url: '/combat/CombatArea/Monsters', icon: 'lock-closed' },
  ];
}
