import { Payer } from "./payer";

export interface ProcessPayment {
    transaction_amount: number;
    token: any;
    description: string;
    installments: number;
    payment_method_id: string;
    issuer_id: number,
    payer:  Payer;
}
