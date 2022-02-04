export interface StatusPayment {
    id: string;
    status: string;
    status_detail: string;
    id_process: string;
    date_approved: string;
    payment_method_id: string;
    payment_type_id: string;
    process_payment_id: number;
}