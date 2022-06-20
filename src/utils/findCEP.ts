import axios from 'axios'
import { SetStateAction } from 'react'
import { toast } from 'react-toastify'

export async function findCEP(cep: any, setDefaultValue: (value: SetStateAction<{}>) => void) {
  const matches = cep.match(/\d*/g)
  const number = matches?.join('')

  if (number.length !== 8) return

  try {
    const resp = await axios.get(`https://viacep.com.br/ws/${number}/json/`)
    const data = {
      zipCode: resp.data.cep,
      street: resp.data.logradouro,
      neighborhood: resp.data.bairro,
      city: resp.data.localidade,
      state: resp.data.uf,
    }
    setDefaultValue(data)
  } catch (err) {
    toast.error('Erro ao buscar CEP.')
  }
}
