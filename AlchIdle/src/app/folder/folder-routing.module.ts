import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { TownComponent } from './town/town.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    children: [
      {
        path: 'Main',
        component: TownComponent,
      },
      {
        path: 'Inventory',
        component: TownComponent,
      },
      {
        path: 'Raiding',
        component: TownComponent,
      },
      {
        path: 'Statistics',
        component: LeaderboardsComponent,
      },
      {
        path: 'Loadout',
        component: TownComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
