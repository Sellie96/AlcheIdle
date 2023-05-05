import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { TownComponent } from './town/town.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
    FolderPage,
    TownComponent,
    LeaderboardsComponent
  ],
  exports: []
})
export class FolderPageModule {}
