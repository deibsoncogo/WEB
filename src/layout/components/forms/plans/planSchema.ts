import * as Yup from 'yup'
import { PlanType } from '../../../../domain/models/plan'

export const planFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é Nescessário'),
  price: Yup.number().required('Preço é Nescessário').min(0.01, 'Preço deve ser maior que zero'),
  planType: Yup.string().required('Tipo de plano é Nescessário'),
  description: Yup.string().required('Descrição é Nescessário'),
  installments: Yup.number().when('planType', {
    is: PlanType.SINGLE_PAYMENT,
    then: Yup.number()
      .required('Quantidade de parcelas é Nescessário')
      .integer('Quantidade de parcelas deve ser um número inteiro')
      .min(1, 'Quantidade de parcelas deve ser maior que zero'),
  }),
  intervalAccessMonths: Yup.number().when('planType', {
    is: PlanType.SINGLE_PAYMENT,
    then: Yup.number()
      .required('Acesso ao Conteúdo é Nescessário')
      .integer('Acesso ao Conteúdo deve ser um número inteiro')
      .min(1, 'Acesso ao Conteúdo deve ser maior que zero'),
  }),
  intervalPaymentMonths: Yup.number().when('planType', {
    is: PlanType.RECURRING_PAYMENT,
    then: Yup.number()
      .required('Intervalo de Pagamento é Nescessário')
      .integer('Intervalo de Pagamento deve ser um número inteiro')
      .min(1, 'Intervalo de Pagamento deve ser maior que zero'),
  }),
})
