import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CredenciaisDTO } from '../../models/credentiais.dto';
import { AuthService } from '../../services/auth.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  senha: string = "password";                                                                                                                                
  credenciais: CredenciaisDTO = {
    email: "",
    password: ""
  };

  sniper : string;
  button = false;
  user: string;

  constructor(
    public router: Router,
    public authService: AuthService,
    public loadingController: LoadingController,
    public categoriaService: CategoriaService) { }

    ngOnInit() {
      this.user = null;
      this.wakeup();
      this.refresh;
      this.sniper = null;
    
  }

  refresh() {
    this.authService.refreshToken()
    .subscribe(response=>
      {
          this.authService.sucessLogin(response.headers.get('Authorization'));
          this.router.navigate(['/home'])
      }), catchError=> {
            console.log(catchError);
            this.router.navigate(['/login']);
      }
  };
   
  wakeup() {
    this.categoriaService.findAll()
    .subscribe(response=>
      {
       console.log("ok");
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
      this.router.navigate(['/home']);
      }, 
      catchError=>
      {
        this.user = "erro"
        this.button = false;
        this.sniper = null;
        this.router.navigate(['/login']);
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
    this.user = null;
    this.button = false;
    this.sniper = null;
  }
}

