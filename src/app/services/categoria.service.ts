import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

import { API_CONFIG } from "src/config/config";
import { CategoriaDTO } from "../models/categoria.dto";

@Injectable()
export class CategoriaService {

  constructor(public http: HttpClient) {
  }

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/categorias/${id}`);
  }

  findAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }
}