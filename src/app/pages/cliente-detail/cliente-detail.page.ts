import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { Endereco } from 'src/app/models/endereco';
import { NewPasswordDTO } from 'src/app/models/new-password.dto';
import { PedidoDTO } from 'src/app/models/pedido.dto';
import { RegistroDTO } from 'src/app/models/registro.dto';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DescricaoService } from 'src/app/services/descricao.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RegistroService } from 'src/app/services/registro.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.page.html',
  styleUrls: ['./cliente-detail.page.scss'],
})
export class ClienteDetailPage implements OnInit {

  registro_id: string;
  cliente_id: string;
  endereco_id: string;//falta receber
  registroDTO: RegistroDTO;
  user_registro: RegistroDTO;
  user_cliente: ClienteDTO;
  endereco: Endereco;
  pedidoDTO: PedidoDTO [] = [];
  pedido: any [] = [];
  page: number = 0;
  sniper: string;
  newPasswordDTO: NewPasswordDTO =
  {
    email: ""
  };
  router_registro_cliente: string;
  router_endereco: string;

  
  constructor(public cardService: CardService, 
    public storageService: StorageService,
    public route: ActivatedRoute, 
    public produtoService: ProdutoService,
    public clienteService: ClienteService,
    public descricaoservice: DescricaoService, 
    public registroService: RegistroService,
    public router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public authService: AuthService,
    public enderecoService: EnderecoService,
    public pedidoService: PedidoService) {
      this.route.queryParams.subscribe(params=> {
        let getNav = this.router.getCurrentNavigation();
        if (getNav.extras.state) {
          this.registro_id = getNav.extras.state.registro_id;
        }
      }); 
     }

  ngOnInit() {
    this.sniper = null;
    this.getMyData();
    this.registroDetail();
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
         this.findByPedidoId();
         this.getEndereco();
      },
      catchError =>
      {
        this.router.navigate(['/login']);
      });
  }

  findByPedidoId() {
    const id = this.registroDTO.id;
    this.pedidoService.findByPedidoId(id, this.page, 3)
    .subscribe(response =>
      {
        let start = this.pedido.length;
        this.pedido = this.pedido.concat(response['content']);
        let end = this.pedido.length -1;
     //   this.loadImage(start, end);
      },
      catchError =>                                                                                                                                                                                                                                                                                               
      {
        console.log(catchError);
      });
  }

  registroDetail() {
    let registro_id = this.registro_id;
    this.registroService.findById(registro_id)
    .subscribe(response=> 
      {
        this.registroDTO = response as RegistroDTO;
        this.cliente_id = this.registroDTO.cliente.id;
        //this.getImage();
      }, 
      catchError=>
      {
        console.log(catchError);
      });
  }

  getEndereco() {
     let registro_id = this.registro_id;
    this.enderecoService.findById(registro_id)
    .subscribe(response=>
      {
        this.endereco = response as Endereco;
        this.endereco_id = this.endereco.id;
      },
     catchError =>
      {
        console.log(catchError);
      }
    );  
  }

  getFindPedidos (registro_id: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        registro_id: registro_id
      }
    };
    this.router.navigate(['home/clientes/cliente-detail/pedidos-detail'], navigationExtras);
  }

  atualizarSenha() {
    this.sniper = "ok";
      this.newPasswordDTO.email = this.registroDTO.email;
      this.authService.sendNewPassword(this.newPasswordDTO)
      .subscribe(response=>
        {
          this.sniper = null;
        }, catchError => 
          {
            this.sniper = null;
            this.presentError();
          });    
  }

  atulizarRegistro() {
    this.router_registro_cliente = "ok";
    let router_registro_cliente = this.router_registro_cliente;
    let registro_id = this.registro_id;
    let cliente_id = this.cliente_id;
      let navigationExtras: NavigationExtras = {
        state: {
          router_registro_cliente: router_registro_cliente,
          registro_id: registro_id,
          cliente_id: cliente_id
        }
      }
      this.router.navigate(['home/clientes/cliente-detail/update-registro'], navigationExtras);
  }

  removerRegistro() {
    console.log("remover registro");
  }

  atualizarEndereco () {
    this.router_endereco = "ok";
    let router_endereco = this.router_endereco;
    let registro_id = this.registro_id;
    let endereco_id = this.endereco_id;
      let navigationExtras: NavigationExtras = {
        state: {
          router_endereco: router_endereco,
          registro_id: registro_id,
          endereco_id: endereco_id
        }
      };
      this.router.navigate(['home/clientes/cliente-detail/update-endereco'], navigationExtras);
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

  async presentError() {
    const alert = await this.alertController.create({
      header: 'Não foi possivel atualizar',
      message: 'Atualize a pagina e tente novamente',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>Resetar senha do cliente</strong>???',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
           this.atualizarSenha();
          }
        }
      ]
    });
    await alert.present();
  }


  async presentAlertConfirmDelete() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Desculpe',
      message: '<strong>Função indisponivel. </strong>',
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }
}
