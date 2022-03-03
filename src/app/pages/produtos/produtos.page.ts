import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { RegistroDTO } from 'src/app/models/registro.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RegistroService } from 'src/app/services/registro.service';
import { StorageService } from 'src/app/services/storage.service';
import { API_CONFIG } from 'src/config/config';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  user_registro: RegistroDTO;
  user_cliente: ClienteDTO;
  itens: ProdutoDTO [] = [];
  page: number = 0;
  image: string;

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
      this.getProduto();
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

    getProduto() {
      const name = '';
      this.produtoService.searchAll(name, this.page, 12)
      .subscribe(response =>
        {
          let start = this.itens.length;
          this.itens = this.itens.concat(response['content']);
          let end = this.itens.length -1;
          this.loadImage(start, end);
        },
        catchError =>                                                                                                                                                                                                                                                                                               
        {
          console.log(catchError);
        });
    }

    loadImage(start: number, end: number) {
      for (var i = start; i<= end; i++) {
        let item = this.itens[i];
        this.produtoService.getProdutoImage(item.id)
        .subscribe(response =>
          {
            item.imageUrl = `${API_CONFIG.bukectBaseUrl}/produtos/prod${item.id}-small.png`;
            this.image = "ok";
          },
          catchError => 
          {
            if (catchError)
            {
              console.log("not image");
              item.imageUrl = '../../assets/icon/camera-outline.svg';
            }
          });
      }
    }

    doRefresh(event) {
      this.page = 0;
      this.itens = [];
      const name = event.target.value;
      this.produtoService.searchAll(name,this.page,0)
      .subscribe(response => {
        let start = this.itens.length;
        this.itens = this.itens.concat(response['content']);  
        let end = this.itens.length -1;
        this.loadImage(start, end);
      });
      this.getProduto();
      setTimeout(() => {
        event.target.complete();
      }, 3000);
    }
    
    loadData(event) {
      this.getProduto();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }

    onInput(event: any){
      this.page = 0;
      this.itens = [];
      const name = event.target.value;
      this.produtoService.searchAll(name,this.page,0)
      .subscribe(response => {
        let start = this.itens.length;
        this.itens = this.itens.concat(response['content']);  
        let end = this.itens.length -1;
        this.loadImage(start, end);
      });
  }

  produtoDetail(produto_id: string) {
    this.router.navigate(['/home/produtos/produtos-update',{produto_id: produto_id}]);
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
