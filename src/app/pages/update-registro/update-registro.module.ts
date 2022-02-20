import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateRegistroPageRoutingModule } from './update-registro-routing.module';

import { UpdateRegistroPage } from './update-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateRegistroPageRoutingModule
  ],
  declarations: [UpdateRegistroPage]
})
export class UpdateRegistroPageModule {}
