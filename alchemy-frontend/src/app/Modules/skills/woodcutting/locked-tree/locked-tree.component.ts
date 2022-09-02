import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-locked-tree',
  templateUrl: './locked-tree.component.html',
  styleUrls: ['./locked-tree.component.scss']
})
export class LockedTreeComponent implements OnInit {

  @Input() level!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
