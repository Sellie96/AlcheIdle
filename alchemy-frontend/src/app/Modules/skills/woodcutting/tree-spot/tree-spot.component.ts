import { Component, Input, OnInit } from '@angular/core';
import { Tree } from '../Trees';

@Component({
  selector: 'app-tree-spot',
  templateUrl: './tree-spot.component.html',
  styleUrls: ['./tree-spot.component.scss']
})
export class TreeSpotComponent implements OnInit {

  @Input() tree!: Tree;

  constructor() { }

  ngOnInit(): void {
  }

}
