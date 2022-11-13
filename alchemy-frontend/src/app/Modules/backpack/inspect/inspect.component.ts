import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BuyingService } from '../../town/buying/buying.service';

export interface InspectDialogData {
  name: string;
  amount: string;
  value: number;
}

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.scss']
})
export class InspectComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectDialogData, private buyingService: BuyingService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  sellItem() {
    this.buyingService.buyItem({
      name: this.data.name,
      description: this.data.amount,
      value: this.data.value
    });
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }
}
