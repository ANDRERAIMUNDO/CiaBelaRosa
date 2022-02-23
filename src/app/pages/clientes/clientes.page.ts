import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavParams } from '@ionic/angular';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { RegistroDTO } from 'src/app/models/registro.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { RegistroService } from 'src/app/services/registro.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  providers: [NavParams]
})
export class ClientesPage implements OnInit {

  user_registro: RegistroDTO;
  user_cliente: ClienteDTO;
  data: string;
  clientes: ClienteDTO [] = [];
  page: number = 0;

  constructor( public router: Router, 
    public authService: AuthService,
    public storageService: StorageService,
    public registroService: RegistroService,
    public clienteService: ClienteService,
    public alertController: AlertController) { }

    ngOnInit() {
    this.getMyData();
    this. getAllCliente();
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
    this.clienteService.findById(this.user_registro.cliente.id)
    .subscribe(response=>
      {
         this.user_cliente = response as ClienteDTO;
      },
      catchError =>
      {
        this.router.navigate(['/login']);
      });
  }

  
  getAllCliente() {
    const name = '';
    this.clienteService.findPage(name, this.page, 12)
    .subscribe(response =>
      {
        let start = this.clientes.length;
        this.clientes = this.clientes.concat(response['content']);
        let end = this.clientes.length -1;
     //   this.loadImage(start, end);
      },
      catchError =>                                                                                                                                                                                                                                                                                               
      {
        console.log(catchError);
      });
  } 

  clienteDetails(registro_id: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        registro_id: registro_id
      }
    };
    this.router.navigate(['home/clientes/cliente-detail'], navigationExtras);
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

  onInputFindPage(event: any){
    this.page = 0;
    this.clientes = [];
    const name = event.target.value;
    this.clienteService.findPage(name,this.page,24)
    .subscribe(response => {
      let start = this.clientes.length;
      this.clientes = this.clientes.concat(response['content']);
      let end = this.clientes.length -1;
    });
  }


  doRefresh(event) {
    this.page = 0;
    this.clientes = [];
    const name = event.target.value;
    this.clienteService.findPage(name,this.page,24)
    .subscribe(response => {
      let start = this.clientes.length;
      this.clientes = this.clientes.concat(response['content']);  
      let end = this.clientes.length -1;
     // this.loadImage(start, end);
    });
    this.getAllCliente();
    setTimeout(() => {
      event.target.complete();
    }, 3000);
  }
}
