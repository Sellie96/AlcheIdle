import { Component, Input, OnInit } from '@angular/core';
import { Ore } from '../Mining';

@Component({
  selector: 'app-mining-spot',
  templateUrl: './mining-spot.component.html',
  styleUrls: ['./mining-spot.component.scss']
})
export class MiningSpotComponent implements OnInit {

  @Input() ore!: Ore;
  @Input() bonus!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
