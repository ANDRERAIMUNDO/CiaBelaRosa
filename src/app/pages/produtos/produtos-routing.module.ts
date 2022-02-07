import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutosPage } from './produtos.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutosPage
  },
  {
    path: 'produtos-update',
    loadChildren: () => import('../produtos-update/produtos-update.module').then( m => m.ProdutosUpdatePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosPageRoutingModule {}
