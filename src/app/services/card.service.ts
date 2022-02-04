import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { ProdutoDTO } from "../models/produto.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class CardService {
    constructor (public storageService: StorageService) {}

    createrOrClearCard(): Card {
        let card: Card = {itens:[]};
        this.storageService.setCard(card);
        return card;
    }

    getCard(): Card {
        let card: Card = this.storageService.getCard();
        if (card == null) 
        {
          card = this.createrOrClearCard();
        }
        return card;
    }

    addProduto(produto: ProdutoDTO): Card {
        let card = this.getCard();
        let position = card.itens.findIndex(x => x.produto.id == produto.id);
        if (position == -1) 
        {
            card.itens.push({quantidade: 1, produto: produto});
        }
        this.storageService.setCard(card);
        return card;
    }

    removerProduto(produto: ProdutoDTO): Card {
        let card = this.getCard();
        let position = card.itens.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
          card.itens.splice(position, 1);
        }
        this.storageService.setCard(card);
        return card;
      }

      addQuantidade(produto: ProdutoDTO): Card {
        let card = this.getCard();
        let position = card.itens.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            card.itens[position].quantidade++;
        }
        this.storageService.setCard(card);
        return card;
      }
      removerQuantidade(produto: ProdutoDTO): Card {
        let card = this.getCard();
        let position = card.itens.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            card.itens[position].quantidade--;
          if (card.itens[position].quantidade < 1) {
            card = this.removerProduto(produto);
          }
        }
        this.storageService.setCard(card);
        return card;
      }
      
      total(): number {
        let card = this.getCard();
        let sum = 0;
        for (var i = 0; i < card.itens.length; i++) {
          sum += card.itens[i].produto.price * card.itens[i].quantidade;
        }
        return sum;
      }
}