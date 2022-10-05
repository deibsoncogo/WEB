type SaleUser = {
  cpf: string
  name: string
  email: string
  phoneNumber: string
}

export type SaleProduct = {
  id: string
  name: string
  amount: number
  quantity: number
  total: number
}

type Address = {
  country: string
  state: string
  city: string
  zip_code: string
  line_1: string
  line_2: string
}

export interface ISaleInformation {
  id: string
  date: string
  status: string
  payment_method: string
  bar_code?: string
  qr_code?: string
  qr_code_url?: string
  pdf?: string
  last_four_digits?: string
  installments?: number
  user: SaleUser
  billing_address: Address
  shipping_address?: Address
  products: SaleProduct[]
  amount: number
}
