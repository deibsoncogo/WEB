import { ICart } from './cart'

export enum PaymentMethodEnum {
  CreditCard = 'credit_card',
  Boleto = 'boleto',
  Pix = 'pix',
  MultiMethod = 'multi_method',
}

export enum TransactionStatus {
  Pending = 'pending',
  Failed = 'failed',
  Paid = 'paid',
  Canceled = 'canceled',
}

export interface ITransaction {
  id?: string
  type: PaymentMethodEnum
  status: TransactionStatus
  createdAt?: Date
  pagarMeId?: string
  cartId?: string
  cart?: ICart
}
