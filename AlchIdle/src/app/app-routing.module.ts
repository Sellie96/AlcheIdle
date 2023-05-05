import { SkillingPageModule } from './folder/skilling/skilling.module';
import { CombatPageModule } from './folder/combat/combat.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';
import { LootOpeningComponent } from './loot-opening/loot-opening.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'OpeningLoot',
    component: LootOpeningComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'app/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'combat/:id',
    loadChildren: () => import('./folder/combat/combat.module').then( m => m.CombatPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'skilling/:id',
    loadChildren: () => import('./folder/skilling/skilling.module').then( m => m.SkillingPageModule),
    canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
