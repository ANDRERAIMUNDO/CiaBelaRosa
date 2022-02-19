import { Pedido } from "./pedido";

export interface ClienteDTO {
  id: string;
  name: string;
  cpf: string;
  dateNasc: string;
  phone: string;
}