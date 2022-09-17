import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-locked-thieving',
  templateUrl: './locked-thieving.component.html',
  styleUrls: ['./locked-thieving.component.scss']
})
export class LockedThievingComponent implements OnInit {

  @Input() level!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
