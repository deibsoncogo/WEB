import { cpf as isCPFValid } from 'cpf-cnpj-validator'

export function validateIfCPFIsValid(cpf: string | undefined): boolean {
  const matches = cpf?.match(/\d*/g)
  const number = matches?.join('')

  if (number?.length !== 11) return false

  const result = isCPFValid.isValid(number as string)
  return result
}
