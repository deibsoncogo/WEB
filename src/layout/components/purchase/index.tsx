import Link from "next/link"
import { useState } from "react"
import { formatDate, formatDateToUTC, KTSVG } from "../../../helpers"
import { PurchaseItems } from "../tables/purchaseItems-list"

type Props = {
  transactionId: string
}

export function PurchaseDetails({ transactionId }: Props) {

  const [data, setData] = useState({
    transactionId,
    date: '2022-04-27',
    status: 'Pago',
    paymentMethod: 'Boleto',
    barCode: '00000.00000.00000.00000.00000.000000 0 00000000000000',
    user: {
      name: 'Clara Holman',
      CPF: '810.212.658-29',
      email: 'holman@hotmail.com',
      phone: '(51) 91234-5678'
    },
    paymentAddress: {
      street: 'Rua Gonçalo de Carvalho',
      number: '123',
      complement: 'apto 10',
      neighborhood: 'Floresta',
      cep: '90035-170',
      city: 'Porto Alegre',
      state: 'RS'
    },
    deliveryAddress: {
      street: 'Rua Santo Inácio',
      number: '123',
      complement: 'apto 3',
      neighborhood: 'Moinhos de Vento',
      cep: '90570-150',
      city: 'Porto Alegre',
      state: 'RS'
    }
  })

  return (
    <div className='border border-secondary p-5'>
      <div className='mb-10'>
        <span className='text-dark fw-bolder d-block fs-1 mb-10'>
          Informações da Transação
        </span>
        <div>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Transação:
            <span className='text-black-50 fs-5 fw-light'>
              {transactionId}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Data:
            <span className='text-black-50 fs-5 fw-light'>
              {formatDate(formatDateToUTC(data.date), 'DD/MM/YYYY')}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Status:
            <span className='text-black-50 fs-5 fw-light'>
              {data.status}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Método de pagamento:
            <span className='text-black-50 fs-5 fw-light'>
              {data.paymentMethod}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Código de barras:
            <span className='text-black-50 fs-5 fw-light'>
              {data.barCode}
            </span>
          </span>
          <Link href='/'>
            <a className='fs-4'>Baixar boleto</a>
          </Link>
        </div>
      </div>
      <div className='w-100'>
        <span className='text-dark fw-bolder d-block fs-1 mb-10'>
          Informações do Usuário e Entrega
        </span>
        <div className='d-flex gap-20'>
          <div className='w-25'>
            <span className='text-dark d-flex align-items-center fs-3 mb-5'>
              <KTSVG path="/icons/com006.svg" className='svg-icon-2x me-2' />
              Dados Pessoais
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Nome:
              <span className='text-black-50 fs-5 fw-light'>
                {data.user.name}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              CPF:
              <span className='text-black-50 fs-5 fw-light'>
                {data.user.CPF}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              E-mail:
              <span className='text-black-50 fs-5 fw-light'>
                {data.user.email}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Telefone:
              <span className='text-black-50 fs-5 fw-light'>
                {data.user.phone}
              </span>
            </span>
          </div>
          <div className='w-25'>
            <span className='text-dark d-block fs-3 mb-5'>
              <KTSVG path="/icons/gen018.svg" className='svg-icon-2x me-2' />
              Endereço de Faturamento
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Logradouro:
              <span className='text-black-50 fs-5 fw-light'>
                {data.paymentAddress.street}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Número:
              <span className='text-black-50 fs-5 fw-light'>
                {data.paymentAddress.number}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Complemento:
              <span className='text-black-50 fs-5 fw-light'>
                {data.paymentAddress.complement}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Bairro:
              <span className='text-black-50 fs-5 fw-light'>
                {data.paymentAddress.neighborhood}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              CEP:
              <span className='text-black-50 fs-5 fw-light'>
                {data.paymentAddress.cep}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Cidade:
              <span className='text-black-50 fs-5 fw-light'>
                {data.paymentAddress.city}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Estado:
              <span className='text-black-50 fs-5 fw-light'>
                {data.paymentAddress.state}
              </span>
            </span>
          </div>
          <div className='w-25'>
            <span className='text-dark d-flex align-items-center fs-3 mb-5'>
              <KTSVG path="/icons/gen018.svg" className='svg-icon-2x me-2' />
              Endereço de Entrega
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Logradouro:
              <span className='text-black-50 fs-5 fw-light'>
                {data.deliveryAddress.street}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Número:
              <span className='text-black-50 fs-5 fw-light'>
                {data.deliveryAddress.number}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Complemento:
              <span className='text-black-50 fs-5 fw-light'>
                {data.deliveryAddress.complement}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Bairro:
              <span className='text-black-50 fs-5 fw-light'>
                {data.deliveryAddress.neighborhood}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              CEP:
              <span className='text-black-50 fs-5 fw-light'>
                {data.deliveryAddress.cep}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Cidade:
              <span className='text-black-50 fs-5 fw-light'>
                {data.deliveryAddress.city}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Estado:
              <span className='text-black-50 fs-5 fw-light'>
                {data.deliveryAddress.state}
              </span>
            </span>
          </div>
        </div>
        <div>
          <span className='text-dark fw-bolder d-flex align-items-center fs-1 mb-10'>
            Informações do Pedido
          </span>
          <PurchaseItems />
        </div>
      </div>
    </div>
  )
}
