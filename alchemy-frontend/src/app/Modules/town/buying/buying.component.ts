import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyingService } from './buying.service';

export interface DialogData {
  name: string;
  description: string;
  value: number;
}

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.scss']
})
export class BuyingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private buyingService: BuyingService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  buyItem() {
    this.buyingService.buyItem({
      name: this.data.name,
      description: this.data.description,
      value: this.data.value
    });
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }

}
