import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/stateManagement/character/CharacterDataTypes';

@Component({
  selector: 'app-skill-rewards',
  templateUrl: './skill-rewards.component.html',
  styleUrls: ['./skill-rewards.component.scss']
})
export class SkillRewardsComponent implements OnInit {

  @Input() playerCharacter!: Skill;
  @Input() skillProgress!: number;
  @Input() activeNode!: any;

  constructor() { }

  ngOnInit(): void {
  }

  standby(value: number | string) {
    if (typeof value === 'string') {
      return value;
    }
    return 'coin';
  }
}
