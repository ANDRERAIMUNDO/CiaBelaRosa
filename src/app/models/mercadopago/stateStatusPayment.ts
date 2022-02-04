export interface StateStatusPaymeny {
        accredited :  "Pronto, seu pagamento foi aprovado! ";
        pending_contingency: "Estamos processando o pagamento.";
        pending_review_manual: "Não se preocupe, em menos de 2 dias úteis informaremos por e-mail se foi creditado ou se necessitamos de mais informação.";
        cc_rejected_bad_filled_card_number:	"Revise o número do cartão.";
        cc_rejected_bad_filled_date: "Revise a data de vencimento.";
        cc_rejected_bad_filled_other: "Revise os dados.";
        cc_rejected_bad_filled_security_code: "Revise o código de segurança do cartão.";
        cc_rejected_blacklist: "Não pudemos processar seu pagamento.";
        cc_rejected_call_for_authorize: "Você deve autorizar metodo de pagamento.";
        cc_rejected_card_disabled: "Ligue para o bando de seu cartão para ativar seu cartão. O telefone está no verso do seu cartão.";
        cc_rejected_card_error:	"Não conseguimos processar seu pagamento.";
        cc_rejected_duplicated_payment:	"Você já efetuou um pagamento com esse valor. Caso precise pagar novamente, utilize outro cartão ou outra forma de pagamento.";
        cc_rejected_high_risk: "Seu pagamento foi recusado.";
        cc_rejected_insufficient_amount: "O saldo insuficiente.";
        cc_rejected_invalid_installments: "O metodo de pagamento não processa pagamentos parcelados.";
        cc_rejected_max_attempts: "Você atingiu o limite de tentativas permitido.";
        cc_rejected_other_reason: "Metodo de pagamento não processa o pagamento.";
        cc_rejected_card_type_not_allowed: "O pagamento foi rejeitado porque o usuário não tem a função crédito habilitada em seu cartão multiplo (débito e crédito).";
}