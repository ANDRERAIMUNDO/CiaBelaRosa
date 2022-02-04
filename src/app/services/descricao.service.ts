import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { API_CONFIG } from "src/config/config";

@Injectable()
export class DescricaoService {

  constructor(public http: HttpClient) {
  }

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/descricoes/${id}`);
  }
}