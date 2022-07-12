import { IAddressResponse } from './addressResponse'
import { IGrantedProductsResponse } from './grantedProductsResponse'

export interface IUserResponse {
  id: string
  name: string
  email: string
  phoneNumber: string
  cpf: string
  birthDate: string
  address: IAddressResponse[]
  level: string
  role: string
  grantedProduct: IGrantedProductsResponse[]
}
