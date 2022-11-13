import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.scss']
})
export class LockedComponent implements OnInit {

  @Input() level: number = 1;
  @Input() url: String = "";


  constructor() { }

  ngOnInit(): void {
  }

}
