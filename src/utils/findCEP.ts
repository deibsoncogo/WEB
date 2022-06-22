import axios from 'axios'
import { toast } from 'react-toastify'

export type ZipCodeProps = {
  zipCode: string
  street: string
  neighborhood: string
  city: string
  state: string
}

export async function findCEP(cep: any) {
  const matches = cep.match(/\d*/g)
  const number = matches?.join('')

  if (number.length !== 8) return

  try {
    const resp = await axios.get(`https://viacep.com.br/ws/${number}/json/`)

    const data: ZipCodeProps = {
      zipCode: resp.data.cep,
      street: resp.data.logradouro,
      neighborhood: resp.data.bairro,
      city: resp.data.localidade,
      state: resp.data.uf,
    }

    return data
  } catch (err) {
    toast.error('Erro ao buscar CEP.')
  }
}
