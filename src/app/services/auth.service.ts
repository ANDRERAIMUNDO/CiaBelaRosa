import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { API_CONFIG } from "src/config/config";
import { LocalUser } from "src/app/models/local_user";
import { CredenciaisDTO } from "../models/credentiais.dto";
import { CardService } from "./card.service";
import { StorageService } from "./storage.service";
import { NewPasswordDTO } from "../models/new-password.dto";

@Injectable()
export class AuthService {

  jwtHelp: JwtHelperService = new JwtHelperService();

  constructor (
    public httpClient : HttpClient,
    public storageService: StorageService,
    public cardService: CardService) {

  }
  authetocation(credenciais: CredenciaisDTO) {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, credenciais, {
      observe: 'response',
      responseType: 'text'
    });
  }

  refreshToken() {
    let token = this.storageService.getLocalUser().token;
    let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
    return this.httpClient.post(`${API_CONFIG.baseUrl}/0auth/refresh_token`,{}, 
    { 
      'headers': authHeader,
      observe: 'response',
      responseType: 'text'
      });
  }

  sendNewPassword (newPass: NewPasswordDTO) {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/0auth/forgot`, newPass, {
      observe: 'response',
      responseType: 'text'
    });
  }

  sucessLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser= {
      token: tok,
      email: this.jwtHelp.decodeToken(tok).sub
    };
    this.storageService.setLocalUser(user);
    this.cardService.createrOrClearCard();
  }

  logout() {
    this.storageService.setLocalUser(null);
  }
}
