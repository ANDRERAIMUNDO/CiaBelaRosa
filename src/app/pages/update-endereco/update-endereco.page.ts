import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { Endereco } from 'src/app/models/endereco';
import { EnderecoUpdateDTO } from 'src/app/models/enderecoUpdate.dto';
import { RegistroDTO } from 'src/app/models/registro.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { RegistroService } from 'src/app/services/registro.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-update-endereco',
  templateUrl: './update-endereco.page.html',
  styleUrls: ['./update-endereco.page.scss'],
})
export class UpdateEnderecoPage implements OnInit {

  
  registro_id: string;
  cliente_id: string;
  endereco_id: string;
  user_registro: RegistroDTO;
  user_cliente: ClienteDTO;
  registroDTO: RegistroDTO;
  clienteDTO: ClienteDTO;
  endereco: Endereco;
  enderecoUpdateDTO:EnderecoUpdateDTO;
  router_endereco: string;
  router_registro_cliente: string;
  formGroupAddress: FormGroup;

  cepMsg: string;
  newCep: string;

  sniper : string;
  button = false;

  contentRegistro: string;
  errorUpdate: string;
  successUpdate: string;

    constructor(public storageService: StorageService, 
    public clienteService: ClienteService, 
    public registroService: RegistroService,
    public alertController: AlertController,
    public enderecoService: EnderecoService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute, 
    public router: Router) {
      this.route.queryParams.subscribe(params=> {
        let getNav = this.router.getCurrentNavigation();
        if (getNav.extras.state) {
          this.router_endereco =  getNav.extras.state.router_endereco;
          this.router_registro_cliente = getNav.extras.state.router_registro_cliente;
          this.registro_id = getNav.extras.state.registro_id;
          this.cliente_id = getNav.extras.state.cliente_id;
        }
      }); 
     }

  ngOnInit() {
    this.getMyData();
    this.registroDetail();
    this.formAddress();
    this.contentRegistro = "ok";
    this.successUpdate = null;
    this.errorUpdate = null;
    this.button = false;
    this.sniper = null;
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
         this.getEndereco();
      },
      catchError =>
      {
        this.router.navigate(['/login']);
      });
  }

  getEndereco() {
    let registro_id = this.registroDTO.id;
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

  registroDetail() {
    let registro_id = this.registro_id;
    this.registroService.findById(registro_id)
    .subscribe(response=> 
      {
        this.registroDTO = response as RegistroDTO;
        //this.getImage();
      }, 
      catchError=>
      {
        console.log(catchError);
      });
  }

  updateAddress(enderecoform: NgForm) {
    this.button = true;
    this.sniper = "ok";

    this.enderecoService.update(this.endereco.id, enderecoform)
      .subscribe(response =>
        {
          console.log(response);
          this.contentRegistro = null;
          this.successUpdate = "ok";  
          
        }, catchError=>
          {
            this.button = false;
            this.sniper = null;
            console.log(catchError);
            this.contentRegistro = null;
            this.errorUpdate = "ok";
          });
  }

  formAddress() {
    this.endereco_id  = this.endereco_id;
    this.formGroupAddress =  this.formBuilder.group(
      {
        cep: ['', [Validators.required]],
        logradouro: ['',[Validators.required]],  
        numero: ['', [Validators.required]],
        complemento: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        localidade:['', [Validators.required]],
        uf: ['', [Validators.required]],
      });
  }

  onChangeCep(event: any) {
    this.newCep = this.formGroupAddress.get('cep').value;
    if (this.newCep.length == 8) {
      this.clienteService.viaCep(this.newCep)
      .subscribe(response=>
        {
          this.enderecoUpdateDTO = response as EnderecoUpdateDTO;//corrigir
          this.cepMsg = null;
        },
          catchError => 
          {
            this.cepMsg = "ok";
          });
    }
  }

  return() {
    this.router.navigate(['home/clientes']);
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
}
