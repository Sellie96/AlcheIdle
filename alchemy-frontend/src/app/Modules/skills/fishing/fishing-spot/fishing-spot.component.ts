import { Component, Input, OnInit } from '@angular/core';
import { Fish } from '../Fishing';

@Component({
  selector: 'app-fishing-spot',
  templateUrl: './fishing-spot.component.html',
  styleUrls: ['./fishing-spot.component.scss']
})
export class FishingSpotComponent implements OnInit {

  @Input() fish!: Fish;
  @Input() bonus: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
