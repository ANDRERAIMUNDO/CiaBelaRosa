import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/config";
import { RegistrationDTO } from "../models/registration.dto";
import { RegistroUpdateEmailDTO } from "../models/registroUpdateEmail.dto";
import { RegistroUpdatePassowordDTO } from "../models/registroUpdatePassword.dto"
import { StorageService } from "./storage.service";

@Injectable()
export class RegistroService {
  constructor(public httpClient: HttpClient,
              public storageService: StorageService) {}

findById(id: string) {
  let token = this.storageService.getLocalUser().token;
  let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
  return this.httpClient.get(`${API_CONFIG.baseUrl}/registros/${id}`,{ 'headers': authHeader });
}

insert(obj: RegistrationDTO) {
  return this.httpClient.post(`${API_CONFIG.baseUrl}/registros/`, obj,{observe: 'response', responseType: 'text'});
}

updateEmail (id, RegistroUpdateEmailDTO): Observable<any> {
  let token = this.storageService.getLocalUser().token;
  let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
  return this.httpClient.put<RegistroUpdateEmailDTO>(`${API_CONFIG.baseUrl}/registros/${id}`,RegistroUpdateEmailDTO, { 'headers': authHeader});
}

updatePassword (id, RegistroUpdatePassowordDTO): Observable<any> {
  let token = this.storageService.getLocalUser().token;
  let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
  return this.httpClient.put<RegistroUpdatePassowordDTO>(`${API_CONFIG.baseUrl}/registros/newpass/${id}`,RegistroUpdatePassowordDTO, { 'headers': authHeader});
}

findByEmail(email: string){
  let token = this.storageService.getLocalUser().token;
  let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
  return this.httpClient.get(`${API_CONFIG.baseUrl}/registros/email?value=${email}`, { 'headers': authHeader });
}

getImageFromBucket(id: string): Observable<any> {
  let url = `${API_CONFIG.bukectBaseUrl}/profiles/cp${id}.png`
  return this.httpClient.get(url, { responseType: 'blob' });
  }

emailNewAccount(email: string){
    let token = this.storageService.getLocalUser().token;
    let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
    return this.httpClient.get(`${API_CONFIG.baseUrl}/registros/send_email_new_account/?value=${email}`, { 'headers': authHeader });
}

emailUpdateAccount (email: string){
    let token = this.storageService.getLocalUser().token;
    let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
    return this.httpClient.get(`${API_CONFIG.baseUrl}/registros/send_email_update/?value=${email}`, { 'headers': authHeader });
}
  
}
