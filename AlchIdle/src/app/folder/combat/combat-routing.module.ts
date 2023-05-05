import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CombatComponent } from './combat.component';
import { SelectMonsterComponent } from './select-monster/select-monster.component';
import { DungeonsComponent } from './dungeons/dungeons.component';
import { ChooseMonsterComponent } from './select-monster/choose-monster/choose-monster.component';
import { CombatPage } from './combat-base/combat.page';

const routes: Routes = [
  {
    path: '', component: CombatPage, children: [
      {
        path: 'Fighting', component: CombatComponent,
      },
      {
        path: 'Select', component: SelectMonsterComponent,
      },
      {
        path: 'Monsters', component: ChooseMonsterComponent,
      },
      {
        path: 'Dungeons', component: DungeonsComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombatPageRoutingModule { }