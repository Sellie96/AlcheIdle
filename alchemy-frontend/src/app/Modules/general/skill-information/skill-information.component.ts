import { Component, Input, OnInit } from '@angular/core';
import { PlayerData, Skill } from 'src/app/stateManagement/character/CharacterDataTypes';

@Component({
  selector: 'app-skill-information',
  templateUrl: './skill-information.component.html',
  styleUrls: ['./skill-information.component.scss']
})
export class SkillInformationComponent implements OnInit {

  @Input() playerCharacter!: Skill;
  @Input() players!: number;


  constructor() { }

  ngOnInit(): void {
  }

  getExperiencePointsForLevel() {
    let points = 0;
    let output = 0;
      for (let lvl = 1; lvl <= this.playerCharacter.level; lvl++) {
        points += Math.floor(lvl + 300.0 * Math.pow(2.0, lvl / 7.0));
          if (lvl >= this.playerCharacter.level) {
              return output;
          }
          output = Math.floor(points / 4);
      }
      return 0;
  }

}
