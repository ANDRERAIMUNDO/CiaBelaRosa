import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/config";
import { Endereco } from "../models/endereco";
import { EnderecoUpdateDTO } from "../models/enderecoUpdate.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class EnderecoService {
    constructor(public httpClient: HttpClient,
    public storageService: StorageService) {}

  findById(id: string) {
    let token = this.storageService.getLocalUser().token;
    let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
    return this.httpClient.get(`${API_CONFIG.baseUrl}/enderecos/${id}`,{ 'headers': authHeader });
  }

  update (id, EnderecoUpdateDTO): Observable<any> {
    let token = this.storageService.getLocalUser().token;
    let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
    return this.httpClient.put<EnderecoUpdateDTO>(`${API_CONFIG.baseUrl}/enderecos/${id}`,EnderecoUpdateDTO, { 'headers': authHeader});
  }
}