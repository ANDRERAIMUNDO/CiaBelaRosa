import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
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
})
export class ClientesPage implements OnInit {

  registroDTO: RegistroDTO = {
    id: "",
    email: "",
    cliente: 
      {
        id: "",
        name: "",
        cpf: "",
        dateNasc: "",
        phone: ""
      },
    imageUrl: ""
  };

  clienteDTO: ClienteDTO = {
    id: "",
    name: "",
    cpf: "",
    dateNasc: "",
    phone: "" 
  }

  constructor( public router: Router, 
    public authService: AuthService,
    public storageService: StorageService,
    public registroService: RegistroService,
    public clienteService: ClienteService) { }

    ngOnInit() {
    this.getMyData();
  }

  getMyData(){
   let localUser = this.storageService.getLocalUser();
   console.log(localUser);
    if (localUser && localUser.email)
     {
       this.registroService.findByEmail(localUser.email)
        .subscribe(response=>
          {
            this.registroDTO = response as RegistroDTO;
            this.getCliente();
            console.log(this.registroDTO); 
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
}