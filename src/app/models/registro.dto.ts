import { ClienteDTO } from "./cliente.dto";

export interface RegistroDTO {
  id: string;
  email: string;
  cliente: ClienteDTO;
  imageUrl?: string;
}
