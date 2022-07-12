import { Address } from './address'
import { GrantedProduct } from './grantedProduct'


export class UserSignUp {
  name: string
  email: string
  password: string
  passwordConfirm: string
  cpf: string
  birthDate: string
  phoneNumber: string
  role: string
  level: string
  address: Address[]
  grantedProduct: GrantedProduct[]

  constructor(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    cpf: string,
    birthDate: Date,
    phoneNumber: string,
    role: string,
    level: string,
    address: Address,
    grantedProduct: GrantedProduct[]
  ) {
    this.name = name
    this.email = email
    this.password = password
    this.passwordConfirm = passwordConfirmation
    this.cpf = cpf
    this.birthDate = birthDate.toISOString().split('T')[0]
    this.phoneNumber = phoneNumber
    this.role = role
    this.level = level
    this.address = new Array()
    this.address.push(address)
    this.grantedProduct = grantedProduct
  }
}
