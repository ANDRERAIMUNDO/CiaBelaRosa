import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteDetailPage } from './cliente-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteDetailPage
  },

  {
    path: 'update-registro',
    loadChildren: () => import('../update-registro/update-registro.module').then( m => m.UpdateRegistroPageModule)
  },

  {
    path: 'pedidos-detail',
    loadChildren: () => import('../pedidos-detail/pedidos-detail.module').then( m => m.PedidosDetailPageModule)
  },
  {
    path: 'update-endereco',
    loadChildren: () => import('../update-endereco/update-endereco.module').then( m => m.UpdateEnderecoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteDetailPageRoutingModule {}
