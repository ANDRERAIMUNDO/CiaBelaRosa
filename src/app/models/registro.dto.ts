import { ClienteDTO } from "./cliente.dto";
import { Perfil } from "./perfis";

export interface RegistroDTO {
  id: string;
  email: string;
  cliente: ClienteDTO;
  imageUrl?: string;
  perfis: Perfil;
}
