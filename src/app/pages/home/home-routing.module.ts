import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'produtos',
    loadChildren: () => import('../produtos/produtos.module').then( m => m.ProdutosPageModule)
  },

  {
    path: 'pedidos',
    loadChildren: () => import('../pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('../clientes/clientes.module').then( m => m.ClientesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
