import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skilling',
  templateUrl: './skilling.component.html',
  styleUrls: ['./skilling.component.scss'],
})
export class SkillingComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  public appPages = [
    { title: 'Alchemy', url: '/app/Alchemy/Alching', icon: 'mail' },
    { title: 'Woodcutting', url: '/app/Woodcutting/Chopping', icon: 'paper-plane' },
    { title: 'Fishing', url: '/app/Fishing/Fish', icon: 'archive' },
    { title: 'Firemaking', url: '/app/Firemaking/Firemaking', icon: 'trash' },
    { title: 'Cooking', url: '/app/Cooking/Cook', icon: 'stats-chart' },
    { title: 'Runecrafting', url: '/app/Runecrafting/Runecraft', icon: 'stats-chart' },
    { title: 'Mining', url: '/app/Mining/Mine', icon: 'stats-chart' },
    { title: 'Thieving', url: '/app/Thieving/Pickpocket', icon: 'stats-chart' },
    { title: 'Agility', url: '/app/Agility/Course', icon: 'stats-chart' },
    { title: 'Forging', url: '/app/Smithing/Forge', icon: 'stats-chart' },
  ];

}
