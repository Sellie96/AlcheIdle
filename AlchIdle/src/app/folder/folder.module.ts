import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { TownComponent } from './town/town.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CombatComponent } from './combat/combat.component';
import { BackpackComponent } from './combat/backpack/backpack.component';
import { EquipmentComponent } from './combat/equipment/equipment.component';
import { ItemsComponent } from './combat/items/items.component';
import { MyTooltipDirective } from '../directives/tooltip.directive';
import { TimestampCountdownDirectiveProgressPlayer } from '../directives/timestamp-countdown-progress.directive';
import { TimestampCountdownDirective } from '../directives/timestamp-countdown.directive';
import { TimestampCountdownDirectiveProgress } from '../directives/timestamp-countdown-progressPlayer.directive';
import { DropsComponent } from '../drops/drops.component';
import { StatsComponent } from './combat/stats/stats.component';

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
    LeaderboardsComponent,
    CombatComponent,
    BackpackComponent,
    EquipmentComponent,
    ItemsComponent,
    DropsComponent,
    StatsComponent,
    MyTooltipDirective,
    TimestampCountdownDirectiveProgress,
    TimestampCountdownDirective,
    TimestampCountdownDirectiveProgressPlayer
  ],
  exports: [
    MyTooltipDirective
  ]
})
export class FolderPageModule {}
