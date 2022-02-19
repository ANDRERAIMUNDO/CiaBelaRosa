import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/config/config";
import { PedidoDTO } from "../models/pedido.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class PedidoService {
    constructor (public httpClient: HttpClient, 
        public storageService: StorageService) {

    }

    insert(obj: PedidoDTO) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.post(`${API_CONFIG.baseUrl}/pedidos`, obj,{'headers': authHeader, observe: 'response', responseType: 'text'});
    }

    findById(id: string) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/pedidos/${id}`,{ 'headers': authHeader });
    }

    searchAll(name: string, page: number=0, linesPerPages: number=12) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/pedidos/?name=${name}&page=${page}&linesPerPages=${linesPerPages}`, {'headers': authHeader });
    }

    getOfName(name: string){
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get<any[]>(`${API_CONFIG.baseUrl}/pedidos/?name=${name}`,{ 'headers': authHeader });
    }

    findByPedidoId(name: string, page: number=0, linesPerPages: number=12) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/pedidos/id/?name=${name}&page=${page}&linesPerPages=${linesPerPages}`, {'headers': authHeader });
    }
}
