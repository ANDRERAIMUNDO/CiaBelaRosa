import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/config";
import { ClienteDTO } from "../models/cliente.dto";
import { ClienteNewDTO } from "../models/clienteNew.dto";
import { ClienteUpdateDTO } from "../models/clienteUpdate.dto";
import { Endereco } from "../models/endereco";
import { StorageService } from "./storage.service"; 

@Injectable()
export class ClienteService {
  
    constructor(public httpClient: HttpClient,public storageService: StorageService){}

    findById(id: string) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/clientes/${id}`,{ 'headers': authHeader });
    }
      
    insert (obj: ClienteNewDTO) {
        return this.httpClient.post(`${API_CONFIG.baseUrl}/clientes`, obj,{observe: 'response', responseType: 'text'});
    }

    update (id, ClienteUpdateDTO): Observable<any> {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.put<ClienteUpdateDTO>(`${API_CONFIG.baseUrl}/clientes/${id}`,ClienteUpdateDTO, { 'headers': authHeader});
    }
      
    viaCep (cep: string): Observable<any> {
        return this.httpClient.get(`${API_CONFIG.viaCepUrl}/${cep}/json`);
    }
}
//https://viacep.com.br/ws/66123120/json/