import { Component } from '@angular/core';
import { ClienteDTO } from './models/cliente.dto';
import { RegistroDTO } from './models/registro.dto';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public appPages = [
    { title: 'Cadastrar Produto', url: '/home/produtos', icon: 'bag-add' },
    { title: 'Atualizar Catalogo', url: '/home/catalagos', icon: 'book'},
    { title: 'Clientes', url: '/home/clientes', icon: 'people' },
    { title: 'Vendas', url: '/home/vendas', icon: 'bag' },
    { title: 'Pedidos recebidos', url: '/home/pedidos', icon: 'cash' },
    { title: 'Pedidos pendentes', url: '/home/pendencias', icon: 'cart' },
    { title: 'Configuracao de conta', url: 'home/config', icon: 'build' },
    { title: 'Atualizar Serviços', url: '/home/upate', icon: 'reload' },
    { title: 'Sair da conta', url: '/home/logout', icon: 'log-out' }
  ]; 

  constructor(public authService: AuthService) { }
}