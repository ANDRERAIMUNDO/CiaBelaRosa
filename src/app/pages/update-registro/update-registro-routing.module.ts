import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateRegistroPage } from './update-registro.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRegistroPageRoutingModule {}
