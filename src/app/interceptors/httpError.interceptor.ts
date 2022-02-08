import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { FieldMessage } from "../models/fieldmessage";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storageService: StorageService, 
    public alertController: AlertController,
    public router: Router){}

  intercept(httpRquest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(httpRquest)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let erroMsg = '';
        if (error.error instanceof ErrorEvent) {
          erroMsg = `Error: ${error.error.message}`;
        }
        else {
          erroMsg =`Error Code: ${error.status}, Message: ${error.message}`;
        }
          switch(error.status) {
            case 403 : this.handle403();
            break;

            case 401: this.handle401();
            break;

            case 422: this.handle422();
              break; 

            case 400: this.handle400();
            break;

            case 500: this.handle500();
            break;

            case 0: this.handle0();
            break;

            default: this.handleDefaultError(error);

          }
        return throwError(erroMsg);
      }) as any
    )
  }

  handle403(){
    this.storageService.getLocalUser();
  }

 async handle401() {
    const alert = await this.alertController.create({
      subHeader: 'Atenção!',
      message: 'Email ou senha podem está errado. ',
      buttons: ['OK']
    });
    await alert.present();
    const {role} = await alert.onDidDismiss();
    console.log(role);
  }

  async handle422() {
    const alert = await this.alertController.create({
      subHeader: 'Erro ao validar. ',
      message: 'Verique os campos, obrigatorio',
      buttons: ['OK']
    });
    await alert.present();
    const {role} = await alert.onDidDismiss();
    console.log(role);
  }

  async handle400() {
    const alert = await this.alertController.create({
      subHeader: 'ops!',
      message: 'Ação não permitida. ',
      buttons: ['OK']
    });
    await alert.present();
    const {role} = await alert.onDidDismiss();
    console.log(role);
  }

  async handle500() {
    const alert = await this.alertController.create({
      subHeader: 'Ops! Algo inesperado aconteceu',
      message: 'Para sua segurança você seja redirecinado para pagina inicial',
      buttons: ['OK']
    });
    await alert.present();
    const {role} = await alert.onDidDismiss();
    console.log(role);
    this.router.navigate(['/login']);
  }


  async handle0() {
    const alert = await this.alertController.create({
      subHeader: 'Ops!',
      message: 'Parece que algo deu errado.',
      buttons: ['OK']
    });
    await alert.present();
    const {role} = await alert.onDidDismiss();
    console.log(role);
    this.router.navigate(['/login']);
  }

  async handleDefaultError(error) {
    const alert = await this.alertController.create({
      subHeader: 'Erro: ' + error.status + ': ' + error.error,
      message: error.message,
      buttons: ['OK']
    });
    await alert.present();
    const {role} = await alert.onDidDismiss();
    console.log(role);
  }

private listErrors(messages: FieldMessage[]): string {
  let s: string = '';
  for (var i = 0; i < messages.length; i++) {
    s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].messagem + '</p>';
  }
  return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
