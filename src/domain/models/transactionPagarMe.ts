import { PaymentMethodEnum, TransactionStatus } from './transaction'

export type IPagarMeAddress = {
  city: string
  state: string
  country: string
  zip_code: string
  line_1: string
  line_2: string
}

type IUser = {
  cpf: string
  email: string
  name: string
  phoneNumber: string
}

export type ITransactionProduct = {
  amount: number
  name: string
  quantity: number
  total: number
  imageUrl: string
}

export interface ITransactionPagarMe {
  id?: string
  payment_method: PaymentMethodEnum
  date: string
  user?: IUser
  billing_address: IPagarMeAddress
  shipping_address: IPagarMeAddress
  bar_code: string
  products: ITransactionProduct[]
  status: TransactionStatus
}
