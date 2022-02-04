import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CredenciaisDTO } from '../../models/credentiais.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public folder: string;

  senha: string = "password";                                                                                                                                
  credenciais: CredenciaisDTO = {
    email: "",
    password: ""
  };

  erroLogin: string;
  sniper : string;
  button = false;
  menu: string;

  constructor(
    public router: Router,
    public authService: AuthService,
    public loadingController: LoadingController,
    public categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute) { }


    ionViewWillEnter() {
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
        this.wakeup();
        this.sniper = null;
        this.erroLogin = null;
        this.refresh();
    }

  refresh() {
    this.authService.refreshToken()
    .subscribe(response=>
      {
          this.authService.sucessLogin(response.headers.get('Authorization'));
          this.menu = "menu";
          this.button = false;//analisa
          this.sniper = null;//analisa
      }), catchError=> {
            console.log(catchError);
            this.router.navigate(['/login']);
      }
  };
   
  wakeup() {
    this.categoriaService.findAll()
    .subscribe(response=>
      {
       console.log(response);
      },
        catchError=> {
          console.log(catchError)  
       });
  }

  login(){
    this.button = true;
    this.sniper = "ok";
    this.authService.authetocation(this.credenciais)
    .subscribe(response=> 
      {
      this.button = true;
      this.sniper = "ok";
      this.authService.sucessLogin(response.headers.get('Authorization'));
      this.menu = "menu";
      this.button = false;//analisa
      this.sniper = null;//analisa
      }, 
      catchError=>
      {
        this.erroLogin = "erro";
        this.button = false;
        this.sniper = null;
     //  }
    });
  }

  showPassword () {
    let show = "text"
    let hide = "password"
    this.senha = show;
    setTimeout(() => {
      this.senha = hide;
    }, 3000);
  }

  reload() {
    this.erroLogin = null;
    this.button = false;
    this.sniper = null;
  }
}
