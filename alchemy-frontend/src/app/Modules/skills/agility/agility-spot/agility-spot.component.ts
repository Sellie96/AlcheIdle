import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../Agility';

@Component({
  selector: 'app-agility-spot',
  templateUrl: './agility-spot.component.html',
  styleUrls: ['./agility-spot.component.scss']
})
export class AgilitySpotComponent implements OnInit {

  @Input() course!: Course;
  @Input() bonus!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
