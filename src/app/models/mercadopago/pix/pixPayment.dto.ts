export interface PixPaymentDTO {
    registroId: string;
    transactionAmount: number;
    description: string;
    paymentMethodId: string;
    email: string;
    firstName: string;
    lastName: string;
    type: string;
    number: string;
    zipCode: string;
    streetName: string;
    streetNumber: number;
    neighborhood: string;
    city: string;
    federalUnit: string;
}