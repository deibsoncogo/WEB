import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IGetSale } from '../../../domain/usecases/interfaces/sale/getSale'
import { formatDate, formatDateToUTC, KTSVG } from '../../../helpers'
import { ISalesResponse } from '../../../interfaces/api-response/salesResponse'

type Props = {
  id: string | string[] | undefined
  getSale: IGetSale
}

export function PageSaleInfo({ id, getSale }: Props) {
  const [sale, setSale] = useState<any>()

  useEffect(() => {
    if (typeof id === 'string') {
      getSale
        .get(id)
        .then((data) => {
          let status: string
          let payment_method: string

          switch (data.status) {
            case 'pending':
              status = 'Pendente'
              break
            case 'failed':
              status = 'Falhou'
              break
            case 'paid':
              status = 'Pago'
              break
            case 'canceled':
              status = 'Cancelado'
              break
            default:
              status = data.status
          }

          switch (data.type) {
            case 'credit_card':
              payment_method = 'Cartão de Crédito'
              break
            case 'boleto':
              payment_method = 'Boleto'
              break
            case 'pix':
              payment_method = 'Pix'
              break
            case 'multi_method':
              payment_method = '2 Cartões'
              break
            default:
              payment_method = data.type
          }

          const sale = {
            id: data.id,
            date: data.createdAt,
            status,
            payment_method,
            user: data.cart.user,
          }
          setSale(sale)
          console.log(sale)
        })
        .catch(() => toast.error('Não foi possível retornar os detalhes da venda.'))
    }
  }, [])

  return (
    <div className='border border-secondary p-5'>
      <div className='mb-10'>
        <span className='text-dark fw-bolder d-block fs-1 mb-10'>Informações da Transação</span>
        <div>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Transação:
            <span className='text-black-50 fs-5 fw-light'>{id}</span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Data:
            <span className='text-black-50 fs-5 fw-light'>
              {formatDate(formatDateToUTC(sale?.date), 'DD/MM/YYYY')}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Status:
            <span className='text-black-50 fs-5 fw-light'>{sale?.status}</span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Método de pagamento:
            <span className='text-black-50 fs-5 fw-light'>{sale?.payment_method}</span>
          </span>
        </div>
        <div className='w-100'>
          <span className='text-dark fw-bolder d-block fs-1 mb-10'>
            Informações do Usuário e Entrega
          </span>
          <div className='d-flex gap-20'>
            <div className='w-25'>
              <span className='text-dark d-flex align-items-center fs-3 mb-5'>
                <KTSVG path='/icons/com006.svg' className='svg-icon-2x me-2' />
                Dados Pessoais
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Nome:
                <span className='text-black-50 fs-5 fw-light'>{sale?.user.name}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                CPF:
                <span className='text-black-50 fs-5 fw-light'>{sale?.user.cpf}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                E-mail:
                <span className='text-black-50 fs-5 fw-light'>{sale?.user.email}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Telefone:
                <span className='text-black-50 fs-5 fw-light'>{sale?.user.phoneNumber}</span>
              </span>
            </div>
            <div className='w-25'>
              <span className='text-dark d-block fs-3 mb-5'>
                <KTSVG path='/icons/gen018.svg' className='svg-icon-2x me-2' />
                Endereço de Faturamento
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Logradouro:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Número:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Complemento:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Bairro:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                CEP:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Cidade:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Estado:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
            </div>
            <div className='w-25'>
              <span className='text-dark d-flex align-items-center fs-3 mb-5'>
                <KTSVG path='/icons/gen018.svg' className='svg-icon-2x me-2' />
                Endereço de Entrega
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Logradouro:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Número:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Complemento:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Bairro:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                CEP:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Cidade:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Estado:
                <span className='text-black-50 fs-5 fw-light'></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
