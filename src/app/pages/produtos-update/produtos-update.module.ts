import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutosUpdatePageRoutingModule } from './produtos-update-routing.module';

import { ProdutosUpdatePage } from './produtos-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutosUpdatePageRoutingModule
  ],
  declarations: [ProdutosUpdatePage]
})
export class ProdutosUpdatePageModule {}
