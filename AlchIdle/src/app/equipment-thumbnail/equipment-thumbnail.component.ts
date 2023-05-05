import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-equipment-thumbnail',
  templateUrl: './equipment-thumbnail.component.html',
  styleUrls: ['./equipment-thumbnail.component.scss'],
})
export class EquipmentThumbnailComponent implements OnInit {
  @Input() equipmentType?: string = '';
  @Input() equipmentName?: string = '';
  @Input() defaultImage?: string = '';
  @Output() onUnequip = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  unequipItem() {
    this.onUnequip.emit(this.equipmentType);
  }

}
