import { GrantedProduct } from '../../domain/models/grantedProduct'
import { IAddressResponse } from './addressResponse'

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
  grantedProduct: GrantedProduct[]
}
