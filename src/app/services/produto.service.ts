import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/config";
import { ProdutoDTO } from "../models/produto.dto";

@Injectable()
export class ProdutoService {
    constructor(public httpCliente: HttpClient){

    }
    findById(produto_id: string) {
        return this.httpCliente.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }
    findByCategoria(categoria_id: string, page: number=0, linesPerPage: number=24) {
        return this.httpCliente.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }
    search(name: string, categorias:string, page: number=0, linesPerPages: number=12) {
        return this.httpCliente.get(`${API_CONFIG.baseUrl}/produtos/?name=${name}&categorias=${categorias}&page=${page}&linesPerPages=${linesPerPages}`);
    }                             
    searchAll(name: string, page: number=0, linesPerPage: number=12) {
        return this.httpCliente.get(`${API_CONFIG.baseUrl}/produtos/all/?name=${name}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImage(id: string) : Observable<any> {
        let url = `${API_CONFIG.bukectBaseUrl}/produtos/prod${id}-small.png`;
        return this.httpCliente.get(url, {responseType:'blob'});
    }

    getProdutoImage(id: string): Observable<any> {
        let url = `${API_CONFIG.bukectBaseUrl}/produtos/prod${id}.png`;
        return this.httpCliente.get(url, {responseType:'blob'});
    }
}