import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SkillingPage } from './skilling.page';
import { SkillingPageRoutingModule } from './skilling-routing.module';
import { SkillingComponent } from './Select/skilling.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    SkillingPageRoutingModule
  ],
  declarations: [
    SkillingPage,
    SkillingComponent
  ],
  exports: []
})
export class SkillingPageModule {}
