import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IGetUser } from '../../../domain/usecases/interfaces/user/getUser'
import { formatDate, formatDateToUTC, KTSVG } from '../../../helpers'
import { IUserResponse } from '../../../interfaces/api-response'
import { cpfMask } from '../../formatters/cpfFormatter'
import { phoneMask } from '../../formatters/phoneFormatter'
import { PurchaseItems } from '../tables/purchaseItems-list'

type Props = {
  transactionId: string
  getUser: IGetUser
}

export function PurchaseDetails({ transactionId, getUser }: Props) {
  const [user, setUser] = useState<IUserResponse>()

  const [purchases, setPurchases] = useState({
    transactionId,
    date: '2022-04-27',
    status: 'Pago',
    paymentMethod: 'Boleto',
    barCode: '00000.00000.00000.00000.00000.000000 0 00000000000000',
    paymentAddress: {
      street: 'Rua Gonçalo de Carvalho',
      number: '123',
      complement: 'apto 10',
      neighborhood: 'Floresta',
      cep: '90035-170',
      city: 'Porto Alegre',
      state: 'RS',
    },
    deliveryAddress: {
      street: 'Rua Santo Inácio',
      number: '123',
      complement: 'apto 3',
      neighborhood: 'Moinhos de Vento',
      cep: '90570-150',
      city: 'Porto Alegre',
      state: 'RS',
    },
    purchaseItems: [
      {
        id: '1',
        name: 'Day Trade - Do básico ao avançado',
        price: 1000,
        quantity: 10,
        total: 10000,
      },
    ],
  })

  useEffect(() => {
    getUser
      .getOne()
      .then((res) => {
        const userData: any = {
          name: res.name,
          email: res.email,
          cpf: res.cpf,
          phoneNumber: res.phoneNumber,
        }
        setUser(userData)
      })
      .catch((err) => toast.error(err.messages + '!'))
  }, [])

  return (
    <div className='border border-secondary p-5'>
      <div className='mb-10'>
        <span className='text-dark fw-bolder d-block fs-1 mb-10'>Informações da Transação</span>
        <div>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Transação:
            <span className='text-black-50 fs-5 fw-light'>{transactionId}</span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Data:
            <span className='text-black-50 fs-5 fw-light'>
              {formatDate(formatDateToUTC(purchases.date), 'DD/MM/YYYY')}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Status:
            <span className='text-black-50 fs-5 fw-light'>{purchases.status}</span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Método de pagamento:
            <span className='text-black-50 fs-5 fw-light'>{purchases.paymentMethod}</span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Código de barras:
            <span className='text-black-50 fs-5 fw-light'>{purchases.barCode}</span>
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
              <KTSVG path='/icons/com006.svg' className='svg-icon-2x me-2' />
              Dados Pessoais
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Nome:
              <span className='text-black-50 fs-5 fw-light'>{user?.name}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              CPF:
              <span className='text-black-50 fs-5 fw-light'>{cpfMask(user?.cpf!)}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              E-mail:
              <span className='text-black-50 fs-5 fw-light'>{user?.email}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Telefone:
              <span className='text-black-50 fs-5 fw-light'>{phoneMask(user?.phoneNumber!)}</span>
            </span>
          </div>
          <div className='w-25'>
            <span className='text-dark d-block fs-3 mb-5'>
              <KTSVG path='/icons/gen018.svg' className='svg-icon-2x me-2' />
              Endereço de Faturamento
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Logradouro:
              <span className='text-black-50 fs-5 fw-light'>{purchases.paymentAddress.street}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Número:
              <span className='text-black-50 fs-5 fw-light'>{purchases.paymentAddress.number}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Complemento:
              <span className='text-black-50 fs-5 fw-light'>
                {purchases.paymentAddress.complement}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Bairro:
              <span className='text-black-50 fs-5 fw-light'>
                {purchases.paymentAddress.neighborhood}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              CEP:
              <span className='text-black-50 fs-5 fw-light'>{purchases.paymentAddress.cep}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Cidade:
              <span className='text-black-50 fs-5 fw-light'>{purchases.paymentAddress.city}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Estado:
              <span className='text-black-50 fs-5 fw-light'>{purchases.paymentAddress.state}</span>
            </span>
          </div>
          <div className='w-25'>
            <span className='text-dark d-flex align-items-center fs-3 mb-5'>
              <KTSVG path='/icons/gen018.svg' className='svg-icon-2x me-2' />
              Endereço de Entrega
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Logradouro:
              <span className='text-black-50 fs-5 fw-light'>
                {purchases.deliveryAddress.street}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Número:
              <span className='text-black-50 fs-5 fw-light'>
                {purchases.deliveryAddress.number}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Complemento:
              <span className='text-black-50 fs-5 fw-light'>
                {purchases.deliveryAddress.complement}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Bairro:
              <span className='text-black-50 fs-5 fw-light'>
                {purchases.deliveryAddress.neighborhood}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              CEP:
              <span className='text-black-50 fs-5 fw-light'>{purchases.deliveryAddress.cep}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Cidade:
              <span className='text-black-50 fs-5 fw-light'>{purchases.deliveryAddress.city}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Estado:
              <span className='text-black-50 fs-5 fw-light'>{purchases.deliveryAddress.state}</span>
            </span>
          </div>
        </div>
        <div>
          <span className='text-dark fw-bolder d-flex align-items-center fs-1 mb-10'>
            Informações do Pedido
          </span>
          <PurchaseItems items={purchases.purchaseItems} />
        </div>
      </div>
    </div>
  )
}
