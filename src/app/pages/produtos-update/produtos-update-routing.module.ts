import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutosUpdatePage } from './produtos-update.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutosUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosUpdatePageRoutingModule {}
