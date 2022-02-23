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
export class HomePage implements OnInit {

  user_registro: RegistroDTO;
  user_cliente: ClienteDTO;


  
  constructor(public produtoService: ProdutoService, 
    public router: Router,
    public storageService: StorageService,
    public registroService: RegistroService,
    public enderecoService: EnderecoService,
    public clienteService: ClienteService,
    public alertController: AlertController,
    public authService: AuthService) { }

    ngOnInit() {
      this.getMyData();
    }
  
    getMyData(){
     let localUser = this.storageService.getLocalUser();
      if (localUser && localUser.email)
       {
         this.registroService.findByEmail(localUser.email)
          .subscribe(response=>
            {
              this.user_registro = response as RegistroDTO;
              this.getCliente();
              if(this.user_registro.perfis !=  'CLIENTE' && 'ADMIN'){
                console.log("ok");
              } else {
                this.acessoNegado();
                this.router.navigate(['/login']);
              }
        })
    } else 
      {
        this.router.navigate(['/login']);
      }
}

  
    getCliente() {
      this.clienteService.findById(this.user_registro.id)
      .subscribe(response=>
        {
           this.user_cliente = response as ClienteDTO;
        },
        catchError =>
        {
          this.router.navigate(['/login']);
        });
    }
    
    atualizarCatalago() {
      this.router.navigate(['/home/produtos/produtos-update']);
    }
  
    meusProdutos() {
      this.router.navigate(['/home/produtos']);
    }
  
    meusClientes() {
      this.router.navigate(['/home/clientes']);
    }
  
    meusPedidos() {
      this.router.navigate(['/home/pedidos']);
    }
  
    pedidosPendentes() {
      this.router.navigate(['/home/pedidos/pedidos-pendentes']);
    }
  
    configuracoes() {
      this.router.navigate(['/home/profile']); 
    }

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    async acessoNegado() {
      const alert = await this.alertController.create({
        subHeader: 'Antenção',
        message: 'Você não possui privilegios para acessar o conteudo!',
        buttons: ['Continuar']
      });
      await alert.present();
      const {role} = await alert.onDidDismiss();
      console.log(role);
      this.logout();
    }
  
  }

  export interface Perfil {
    0: string;
    1: string;
  //  CLIENTE = 1,
  }