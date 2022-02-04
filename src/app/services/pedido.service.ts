import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/config/config";
import { PedidoDTO } from "../models/pedido.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class PedidoService {
    constructor (public httpClient: HttpClient, public storageService: StorageService) {

    }

    findById(id: string) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/pedidos/${id}`,{ 'headers': authHeader });
    }

    findAll() {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/pedidos`,{ 'headers': authHeader });
    }

    searchAll(name: string, page: number=0, linesPerPage: number=12) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/pedidos/?name=${name}&page=${page}&linesPerPage=${linesPerPage}`, {'headers': authHeader });
    }

    get(name: string){
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get<any[]>(`${API_CONFIG.baseUrl}/pedidos/?name=${name}`,{ 'headers': authHeader });
    }

    insert(obj: PedidoDTO) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.post(`${API_CONFIG.baseUrl}/pedidos`, obj,{'headers': authHeader, observe: 'response', responseType: 'text'});
    }
}
