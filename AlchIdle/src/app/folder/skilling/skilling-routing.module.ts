import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillingPage } from './skilling.page';
import { SkillingComponent } from './Select/skilling.component';

const routes: Routes = [
  {
    path: '', component: SkillingPage, children: [
      {
        path: 'Select', component: SkillingComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillingPageRoutingModule { }