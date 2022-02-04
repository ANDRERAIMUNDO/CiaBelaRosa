export interface ProcessPaymentDTO {
    registroId: string;
    transaction_amount: number;
    token: any;
    description: string;
    installments: number;
    payment_method_id: string;
    issuer_id: number;    
    email : string;
}