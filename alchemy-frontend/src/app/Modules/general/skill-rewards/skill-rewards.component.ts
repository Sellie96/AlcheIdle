import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() timeUntilFinish!: number;

  @Output() finished: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.timeUntilFinish = (Date.now() / 1000) + (this.activeNode?.time || 0);
  }

  standby(value: number | string) {
    if (typeof value === 'string') {
      return value;
    }
    return 'coin';
  }

  resetTimer() {
    this.timeUntilFinish = (Date.now() / 1000) + this.activeNode.time;
    this.finished.emit();
  }
}
