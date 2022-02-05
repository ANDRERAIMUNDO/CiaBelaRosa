import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { RegistroDTO } from 'src/app/models/registro.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RegistroService } from 'src/app/services/registro.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public folder: string;

  registroDTO: RegistroDTO;
  clienteDTO: ClienteDTO;

  public appPages =  [
    { title: 'Cadastrar Produto', url: '/home/produtos', icon: 'bag-add' },
    { title: 'Atualizar Catalogo', url: '/home/catalagos', icon: 'book'},
    { title: 'Clientes', url: '/home/clientes', icon: 'people' },
    { title: 'Vendas', url: '/home/vendas', icon: 'bag' },
    { title: 'Pedidos recebidos', url: '/home/pedidos', icon: 'cash' },
    { title: 'Pedidos pendentes', url: '/home/pendencias', icon: 'cart' },
    { title: 'Configuracao de conta', url: 'home/config', icon: 'build' },
    { title: 'Atualizar Serviços', url: '/home/upate', icon: 'reload' }
  ]; 
  
  constructor(public produtoService: ProdutoService, 
    public router: Router,
    public storageService: StorageService,
    public registroService: RegistroService,
    public enderecoService: EnderecoService,
    public clienteService: ClienteService,
    public alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) { }

    ionViewWillEnter() {
       this.getMyData();
    }

    getMyData() {
      let localUser = this.storageService.getLocalUser();
      if (localUser && localUser.email)
      {
        this.registroService.findByEmail(localUser.email)
        .subscribe(response=>
          {
            this.registroDTO = response as RegistroDTO;
            this.folder = this.activatedRoute.snapshot.paramMap.get('id');
            this.getCliente();
          },
         catchError =>
         {
            this.router.navigate(['/login']);
         });
      }
    }

    getCliente() {
      this.clienteService.findById(this.registroDTO.id)
      .subscribe(response=>
        {
          this.clienteDTO = response as ClienteDTO;
        },
        catchError =>
        {
          console.log(catchError);
        });
    }

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
    }

  }