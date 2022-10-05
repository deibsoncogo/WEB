import * as Yup from 'yup'
import { PlanType } from '../../../../domain/models/plan'

export const planFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é necessário'),
  price: Yup.number().required('Preço é necessário').min(0.01, 'Preço deve ser maior que zero'),
  planType: Yup.string().required('Tipo de plano é necessário'),
  description: Yup.string().required('Descrição é necessária'),
  imagePreview: Yup.string().required('Imagem é necessária'),
  installments: Yup.number().when('planType', {
    is: PlanType.SINGLE_PAYMENT,
    then: Yup.number()
      .required('Quantidade de parcelas é necessário')
      .integer('Quantidade de parcelas deve ser um número inteiro')
      .min(1, 'Quantidade de parcelas deve ser maior que zero'),
  }),
  intervalAccessMonths: Yup.number().when('planType', {
    is: PlanType.SINGLE_PAYMENT,
    then: Yup.number()
      .required('Acesso ao conteúdo é necessário')
      .integer('Acesso ao conteúdo deve ser um número inteiro')
      .min(1, 'Acesso ao conteúdo deve ser maior que zero'),
  }),
  intervalPaymentMonths: Yup.number().when('planType', {
    is: PlanType.RECURRING_PAYMENT,
    then: Yup.number()
      .required('Intervalo de pagamento é necessário')
      .integer('Intervalo de pagamento deve ser um número inteiro')
      .min(1, 'Intervalo de pagamento deve ser maior que zero'),
  }),
  categoryId: Yup.string().required('Selecione uma categoria'),
})
