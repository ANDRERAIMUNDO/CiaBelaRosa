import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateEnderecoPageRoutingModule } from './update-endereco-routing.module';

import { UpdateEnderecoPage } from './update-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateEnderecoPageRoutingModule
  ],
  declarations: [UpdateEnderecoPage]
})
export class UpdateEnderecoPageModule {}
