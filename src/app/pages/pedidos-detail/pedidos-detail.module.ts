import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosDetailPageRoutingModule } from './pedidos-detail-routing.module';

import { PedidosDetailPage } from './pedidos-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosDetailPageRoutingModule
  ],
  declarations: [PedidosDetailPage]
})
export class PedidosDetailPageModule {}
