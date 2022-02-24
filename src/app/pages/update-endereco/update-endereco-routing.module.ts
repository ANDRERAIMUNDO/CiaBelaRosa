import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateEnderecoPage } from './update-endereco.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateEnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateEnderecoPageRoutingModule {}
