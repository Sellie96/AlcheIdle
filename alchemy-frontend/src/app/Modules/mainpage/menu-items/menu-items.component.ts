import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/stateManagement/character/CharacterDataTypes';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  @Input() name: String = '';
  @Input() skill?: Skill;

  constructor() { }

  ngOnInit(): void {
  }

}
