import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TimestampCountdownDirectiveProgressPlayer } from 'src/app/directives/timestamp-countdown-progress.directive';
import { TimestampCountdownDirectiveProgress } from 'src/app/directives/timestamp-countdown-progressPlayer.directive';
import { TimestampCountdownDirective } from 'src/app/directives/timestamp-countdown.directive';
import { MyTooltipDirective } from 'src/app/directives/tooltip.directive';
import { DropsComponent } from 'src/app/drops/drops.component';
import { BackpackComponent } from './backpack/backpack.component';
import { CombatPageRoutingModule } from './combat-routing.module';
import { CombatComponent } from './combat.component';
import { ItemsComponent } from './items/items.component';
import { StatsComponent } from './stats/stats.component';
import { SelectMonsterComponent } from './select-monster/select-monster.component';
import { DungeonsComponent } from './dungeons/dungeons.component';
import { ChooseMonsterComponent } from './select-monster/choose-monster/choose-monster.component';
import { CombatPage } from './combat-base/combat.page';
import { MonsterStatsComponent } from 'src/app/utils/monster-stats/monster-stats.component';
import { EquipmentThumbnailComponent } from 'src/app/equipment-thumbnail/equipment-thumbnail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CombatPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
    CombatComponent,
    BackpackComponent,
    ItemsComponent,
    DropsComponent,
    StatsComponent,
    DungeonsComponent,
    MonsterStatsComponent,
    MyTooltipDirective,
    TimestampCountdownDirectiveProgress,
    TimestampCountdownDirective,
    TimestampCountdownDirectiveProgressPlayer,
    CombatPage,
    SelectMonsterComponent,
    ChooseMonsterComponent,
    EquipmentThumbnailComponent
  ],
  exports: [
    MyTooltipDirective
  ]
})
export class CombatPageModule {}
