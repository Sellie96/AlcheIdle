import { Component, Input, OnInit } from '@angular/core';
import { Thieving } from '../Thieving';

@Component({
  selector: 'app-thieving-spot',
  templateUrl: './thieving-spot.component.html',
  styleUrls: ['./thieving-spot.component.scss']
})
export class ThievingSpotComponent implements OnInit {

  @Input() thievingTarget!: Thieving;

  constructor() { }

  ngOnInit(): void {
  }

}
