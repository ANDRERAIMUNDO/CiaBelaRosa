import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosDetailPage } from './pedidos-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosDetailPageRoutingModule {}
