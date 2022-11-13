import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyingComponent } from '../buying/buying.component';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})

export class ShopItemComponent implements OnInit {
  @Input() name!: string;
  @Input() description!: string;
  @Input() value!: number;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(BuyingComponent, {
      data: {
        name: this.name,
        description: this.description,
        value: this.value,
      },
      scrollStrategy: new NoopScrollStrategy()
    });
  }
}
