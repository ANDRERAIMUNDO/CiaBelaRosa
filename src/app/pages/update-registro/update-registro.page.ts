import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { Endereco } from 'src/app/models/endereco';
import { RegistroDTO } from 'src/app/models/registro.dto';
import { RegistroUpdateEmailDTO } from 'src/app/models/registroUpdateEmail.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { RegistroService } from 'src/app/services/registro.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-update-registro',
  templateUrl: './update-registro.page.html',
  styleUrls: ['./update-registro.page.scss'],
})
export class UpdateRegistroPage implements OnInit {

  registro_id: string;
  cliente_id: string;
  endereco_id: string;
  user: RegistroDTO;
  registroDTO: RegistroDTO;
  clienteDTO: ClienteDTO;
  endereco: Endereco;
  registroUpdateEmailDTO: RegistroUpdateEmailDTO = 
    {
      email: ""
    };
  router_endereco: string;
  router_registro_cliente: string;
  formGroupRegistro: FormGroup;
  formGroupCliente: FormGroup;
  formGroupAddress: FormGroup;

  emailMsg: string;
  validEmailMsg: string;
  email: string;
  newEmail: string;
  emailConfirm: string;

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
          this.endereco_id = getNav.extras.state.endereco_id;
          console.log( "router_endereco: " + this.router_endereco);//teste
          console.log( "router_registro_cliente: " + this.router_registro_cliente);//teste
          console.log( "registro_id: " + this.registro_id);//teste
          console.log( "cliente_id: " + this.cliente_id);//teste
          console.log( "endereco_id: " + this.endereco_id);//teste
        }
      }); 
     }

  ngOnInit() {
    this.getMyData();
    this.registroDetail();
    this.formRegistro();
    this.formCliente();
    this.formAddress();
    this.contentRegistro = "ok";
    this.validEmailMsg = "ok;"
    this.successUpdate = null;
    this.errorUpdate = null;
    this.button = false;
    this.sniper = null;
  }

  getMyData(){//registroDTO
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
         this.getEndereco();
      },
      catchError =>
      {
        this.router.navigate(['/login']);
      });
  }

  getEndereco() {
    let registro_id = this.user.id;
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
        this.user = response as RegistroDTO;
        //this.getImage();
      }, 
      catchError=>
      {
        console.log(catchError);
      });
  }

  updateRegistro(registroform: NgForm) {
    console.log(this.registroUpdateEmailDTO);
    this.button = true;
    this.sniper = "ok";

    this.registroService.updateEmail(this.user.id, registroform)
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

  formRegistro() {
    this.registro_id  = this.route.snapshot.params['id'];
   // this.registro_id  = this.registro_id;
    this.formGroupRegistro =  this.formBuilder.group(
    { 
      email: ['', Validators.email],
      emailConfirm: ['', Validators.email]
    })
  }

  formCliente() {
    this.registro_id  = this.registro_id;
    this.formGroupCliente =  this.formBuilder.group(
    {
      phone: [null,[Validators.required, Validators.minLength(11)]]
    });
  }

  formAddress () {
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

  onChangeEmail(event: any) {
    this.newEmail = this.formGroupRegistro.get('email').value;
    this.emailConfirm = this.formGroupRegistro.get('emailConfirm').value;
    let newEmail = this.newEmail;
    let emailConfirm = this.emailConfirm;
    if (newEmail == emailConfirm) 
      {
        this.registroUpdateEmailDTO.email = newEmail;
        this.emailMsg = null;
        this.validEmailMsg = null;
      } else 
        {
          this.emailMsg = "ok";
          this.validEmailMsg = "ok";
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
