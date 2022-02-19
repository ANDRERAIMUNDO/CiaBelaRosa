import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteDetailPage } from './cliente-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteDetailPage
  },
  {
    path: 'pedidos-detail',
    loadChildren: () => import('../pedidos-detail/pedidos-detail.module').then( m => m.PedidosDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteDetailPageRoutingModule {}
