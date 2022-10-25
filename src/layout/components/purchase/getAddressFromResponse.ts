import { IPagarMeAddress } from '../../../domain/models/transactionPagarMe'

export interface ITransactionAddress {
  street: string
  number: string
  neighborhood: string
  complement: string
  state: string
  zipCode: string
  city: string
}

export function getAddressFromResponse(pagarMeAdrress: IPagarMeAddress): ITransactionAddress {
  const { line_1, line_2, state, zip_code, city } = pagarMeAdrress
  const [number, street, neighborhood] = line_1.split(',')

  const formattedAdrees: ITransactionAddress = {
    number,
    street,
    neighborhood,
    complement: line_2,
    state,
    zipCode: zip_code,
    city,
  }
  return formattedAdrees
}
