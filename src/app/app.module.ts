import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { CategoriaService } from './services/categoria.service';
import { RegistroService } from './services/registro.service';
import { ClienteService } from './services/cliente.service';
import { ProdutoService } from './services/produto.service';
import { EnderecoService } from './services/endereco.service';
import { PedidoService } from './services/pedido.service';
import { PhotoService } from './services/photo.service';
import { ImageUtilService } from './services/ ImageUtilService';
import { DescricaoService } from './services/descricao.service';
import { CardService } from './services/card.service';
import { MpService } from './services/mp.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/httpError.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { httpAuthInterceptor } from './interceptors/httpAuth.interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
     AppRoutingModule, 
     ServiceWorkerModule.register('ngsw-worker.js',
      {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'})
    ],
  providers: [
      { provide: RouteReuseStrategy, 
        useClass: IonicRouteStrategy,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      },  
      {
        provide: HTTP_INTERCEPTORS,
        useClass : httpAuthInterceptor,
        multi: true
      },
      {
        provide: Window, 
        useValue: window
      },
      AuthService,
      StorageService,
      CategoriaService,
      RegistroService,
      ClienteService,
      ProdutoService,
      CardService,
      EnderecoService,
      PedidoService,
      DescricaoService,
      PhotoService,
      ImageUtilService,
      MpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
