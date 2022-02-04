import { RegistroDTO } from "../../registro.dto";
import { PixPointOfInteraction } from "./pixPointOfInteraction";
import { PixTransactionDetails } from "./pixTransactionDetails";

export interface PixPayment {
    id: string;
    id_process: string;
    status: string;
    status_detail: string;
    pixTransactionDetails: PixTransactionDetails;
    pixPointOfInteraction: PixPointOfInteraction;
    registro: RegistroDTO;
}