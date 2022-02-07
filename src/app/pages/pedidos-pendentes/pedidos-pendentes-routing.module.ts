import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosPendentesPage } from './pedidos-pendentes.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosPendentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosPendentesPageRoutingModule {}
