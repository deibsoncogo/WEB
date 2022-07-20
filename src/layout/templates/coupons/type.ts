import * as Yup from 'yup'

export const couponFormSchema = Yup.object().shape({
  name: Yup.string().required('Código é necessário'),
  value: Yup.number().min(1, 'Valor mínimo não pode ser vazio').required('Valor é necessário'),
  type: Yup.string().required('Tipo é necessário'),
  quantity: Yup.number().min(1, 'Devem ter no mínico um cupom').required('Quantidade é necessária'),
  expirationDate: Yup.string().required('Data é necessária'),
})

export type IDiscountType = 'percentage' | 'value'
