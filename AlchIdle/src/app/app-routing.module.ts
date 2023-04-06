import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'app/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
