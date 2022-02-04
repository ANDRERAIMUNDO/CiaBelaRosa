import { ClienteDTO } from "./cliente.dto";
import { Endereco } from "./endereco";
import { ItemPedidoDTO } from "./item-pedido.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { RefDTO } from "./ref.dto";
import { RegistroDTO } from "./registro.dto";

export interface Pedido {
  id: string;
  instante: string;
  pagamento: PagamentoDTO;
  registro: RegistroDTO;
  cliente: ClienteDTO;
  endereco: Endereco;
  itemPedido:ItemPedidoDTO;
  }