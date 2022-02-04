import { PixApplicationData } from "./pixApplicationData";
import { PixTransactionData } from "./pixTransactionData";

export interface PixPointOfInteraction {
    id: string;
    type: string;
    sub_type: string;
    pixApplicationData: PixApplicationData;
    pixTransactionData: PixTransactionData;
}