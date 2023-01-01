import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drops',
  templateUrl: './drops.component.html',
  styleUrls: ['./drops.component.scss'],
})
export class DropsComponent implements OnInit {

  @Input() monster: any;

  constructor() { }

  ngOnInit() {
    console.log(this.monster);
  }

}
