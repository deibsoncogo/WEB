import { Address } from './address'

export class UserUpdate {
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

  constructor(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    cpf: string,
    birthDate: string,
    phoneNumber: string,
    role: string,
    level: string,
    address: Address
  ) {
    this.name = name
    this.email = email
    this.password = password
    this.passwordConfirm = passwordConfirmation
    this.cpf = cpf
    this.birthDate = birthDate
    this.phoneNumber = phoneNumber
    this.role = role
    this.level = level
    this.address = new Array()
    this.address.push(address)
  }
}
