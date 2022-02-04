import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/config/config";
import { PixPaymentDTO } from "../models/mercadopago/pix/pixPayment.dto";
import { ProcessPayment } from "../models/mercadopago/processPayment";
import { ProcessPaymentDTO } from "../models/mercadopago/processPayment.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class MpService {
    constructor(public httpClient: HttpClient,
    public storageService: StorageService) {}

    insert(obj: ProcessPaymentDTO) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.post(`${API_CONFIG.baseUrl}/process_payment/`, obj,{'headers': authHeader, observe: 'response', responseType: 'text'});
    }

    pix(obj: PixPaymentDTO) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.post(`${API_CONFIG.baseUrl}/pix_process_payment/`, obj,{'headers': authHeader, observe: 'response', responseType: 'text'});
    }
    
    findById(id: string) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/process_payment/statuspayment/${id}`,{ 'headers': authHeader });
    }

    pixFindById(id: string) {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/pix_process_payment/${id}`,{ 'headers': authHeader });
    }


    findAll() {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});
        return this.httpClient.get(`${API_CONFIG.baseUrl}/process_payment/statuspayment/all`,{ 'headers': authHeader });
    }
}
