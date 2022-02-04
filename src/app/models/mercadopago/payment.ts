export interface Payment {
    email: string;
    docType: string;
    docNumber: string;
    cardholderName: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    cardNumber: string;
    securityCode: string;
    issuer: number;
    installments: number;
    transactionAmount: number ;
    paymentMethodId: string;
    description: string;
}