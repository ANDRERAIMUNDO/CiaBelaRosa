import { ItemPedidoDTO } from "./item-pedido.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { RefDTO } from "./ref.dto";

export interface PedidoDTO {
  registro: RefDTO;
  cliente: RefDTO;
  enderecoDeEntrega: RefDTO;
  pagamento: PagamentoDTO;  
  itens: ItemPedidoDTO[];
  id?: string;
  }

  //analisar a adição de statusPaymeny e processPayment RefDTO

  //instante