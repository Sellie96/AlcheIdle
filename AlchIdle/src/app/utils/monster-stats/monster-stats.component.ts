import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monster-stats',
  templateUrl: './monster-stats.component.html',
  styleUrls: ['./monster-stats.component.scss'],
})
export class MonsterStatsComponent implements OnInit {
  @Input() monster: any;

  @Input() chanceToHit: number = 0;
  @Input() chanceToDodge: number = 0;

  constructor() { }

  ngOnInit() {}

}
