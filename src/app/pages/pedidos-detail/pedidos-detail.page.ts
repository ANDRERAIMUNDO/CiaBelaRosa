import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { Endereco } from 'src/app/models/endereco';
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
  selector: 'app-pedidos-detail',
  templateUrl: './pedidos-detail.page.html',
  styleUrls: ['./pedidos-detail.page.scss'],
})
export class PedidosDetailPage implements OnInit {


  registro_id: string;
  user: RegistroDTO;
  registroDTO: RegistroDTO;
  clienteDTO: ClienteDTO;
  endereco: Endereco;
  pedido: any [] = [];
  page: number = 0;

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
             this.registroDTO = response as RegistroDTO;
             this.getCliente();
             if(this.registroDTO.perfis !=  'CLIENTE' && 'ADMIN'){
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
    this.clienteService.findById(this.registroDTO.id)
    .subscribe(response=>
      {
         this.clienteDTO = response as ClienteDTO;
         this.findByPedidoId();
         this.getEndereco();
      },
      catchError =>
      {
        this.router.navigate(['/login']);
      });
  }

  registroDetail() {
    let registro_id = this.registro_id;
    this.registroService.findById(registro_id)
    .subscribe(response=> 
      {
        this.user = response as RegistroDTO;
        //this.getImage();
      }, 
      catchError=>
      {
        console.log(catchError);
      });
  }

  getEndereco(){
    let registro_id = this.registro_id;
    this.enderecoService.findById(registro_id)
    .subscribe(response=>
      {
        this.endereco = response as Endereco;
      },
     catchError =>
      {
        console.log(catchError);
      }
    );  
  }

  findByPedidoId() {
    const name = '';
    this.pedidoService.findByPedidoId(name, this.page, 24)
    .subscribe(response =>
      {
        let start = this.pedido.length;
        this.pedido = this.pedido.concat(response['content']);
        console.log(this.pedido);
        let end = this.pedido.length -1;
     //   this.loadImage(start, end);
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
