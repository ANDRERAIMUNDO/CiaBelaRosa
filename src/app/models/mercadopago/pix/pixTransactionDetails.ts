export interface PixTransactionDetails {
    id: string;
    net_received_amount: number;
    total_paid_amount: number;
    overpaid_amount: number;
    external_resource_url: string;
    installment_amount: number;
    financial_institution: string;
}