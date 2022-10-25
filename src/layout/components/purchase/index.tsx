import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ITransaction } from '../../../domain/models/transaction'
import { ITransactionPagarMe } from '../../../domain/models/transactionPagarMe'
import { IGetTransactionById } from '../../../domain/usecases/interfaces/transactions/getTransactionById'
import { formatDate, formatDateToUTC, KTSVG } from '../../../helpers'
import { cepMask } from '../../formatters/cepFormatter'
import { cpfMask } from '../../formatters/cpfFormatter'
import { phoneMask } from '../../formatters/phoneFormatter'
import { PurchaseItems } from '../tables/purchaseItems-list'
import { getAddressFromResponse, ITransactionAddress } from './getAddressFromResponse'

type Props = {
  remoteGetTransactionById: IGetTransactionById
}

type Adresses = {
  billing?: ITransactionAddress
  shiping?: ITransactionAddress
}

const transactionStatus = {
  pending: 'Pendente',
  failed: 'Falhou',
  paid: 'Pago',
  canceled: 'Cancelado',
}

export function PurchaseDetails({ remoteGetTransactionById }: Props) {
  const [transaction, setTransaction] = useState<ITransactionPagarMe>({} as ITransactionPagarMe)

  const [addresses, setAddresses] = useState<Adresses | null>(null)

  useEffect(() => {
    remoteGetTransactionById
      .get()
      .then((response) => {
        setTransaction(response)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [])

  useEffect(() => {
    if (transaction.billing_address || transaction.shipping_address) {
      const updatededAddresses: Adresses = {}

      if (transaction.billing_address) {
        const updatedBillingAddress = getAddressFromResponse(transaction.billing_address)
        updatededAddresses.billing = { ...updatedBillingAddress }
      }

      if (transaction.shipping_address) {
        const updatedShippingAddress = getAddressFromResponse(transaction.shipping_address)
        updatededAddresses.billing = { ...updatedShippingAddress }
      }

      setAddresses(updatededAddresses)
    }
  }, [transaction])

  return (
    <div className='border border-secondary p-5'>
      <div className='mb-10'>
        <span className='text-dark fw-bolder d-block fs-1 mb-10'>Informações da Transação</span>
        <div>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Transação:
            <span className='text-black-50 fs-5 fw-light'>{transaction.id}</span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Data:
            <span className='text-black-50 fs-5 fw-light'>
              {formatDate(formatDateToUTC(transaction.date), 'DD/MM/YYYY')}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Status:
            <span className='text-black-50 fs-5 fw-light'>
              {transactionStatus?.[transaction.status]}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Método de pagamento:
            <span className='text-black-50 fs-5 fw-light'>{transaction.payment_method}</span>
          </span>
          <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
            Código de barras:
            <span className='text-black-50 fs-5 fw-light'>{transaction.bar_code}</span>
          </span>
          <Link href='/'>
            <a className='fs-4'>Baixar boleto</a>
          </Link>
        </div>
      </div>
      <div className='w-100'>
        <span className='text-dark fw-bolder d-block fs-1 mb-10'>
          Informações do Usuário {addresses?.shiping && 'e Entrega'}
        </span>
        <div className='d-flex gap-20'>
          <div className='w-25'>
            <span className='text-dark d-flex align-items-center fs-3 mb-5'>
              <KTSVG path='/icons/com006.svg' className='svg-icon-2x me-2' />
              Dados Pessoais
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Nome:
              <span className='text-black-50 fs-5 fw-light'>{transaction?.user?.name}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              CPF:
              <span className='text-black-50 fs-5 fw-light'>
                {cpfMask(transaction?.user?.cpf!)}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              E-mail:
              <span className='text-black-50 fs-5 fw-light'>{transaction?.user?.email}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Telefone:
              <span className='text-black-50 fs-5 fw-light'>
                {phoneMask(transaction?.user?.phoneNumber!)}
              </span>
            </span>
          </div>

          <div className='w-25'>
            <span className='text-dark d-block fs-3 mb-5'>
              <KTSVG path='/icons/gen018.svg' className='svg-icon-2x me-2' />
              Endereço de Faturamento
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Logradouro:
              <span className='text-black-50 fs-5 fw-light'>{addresses?.billing?.street}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Número:
              <span className='text-black-50 fs-5 fw-light'>{addresses?.billing?.number}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Complemento:
              <span className='text-black-50 fs-5 fw-light'>{addresses?.billing?.complement}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Bairro:
              <span className='text-black-50 fs-5 fw-light'>
                {addresses?.billing?.neighborhood}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              CEP:
              <span className='text-black-50 fs-5 fw-light'>
                {cepMask(addresses?.billing?.zipCode!!)}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Cidade:
              <span className='text-black-50 fs-5 fw-light'>{addresses?.billing?.city}</span>
            </span>
            <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
              Estado:
              <span className='text-black-50 fs-5 fw-light'>{addresses?.billing?.state}</span>
            </span>
          </div>

          {addresses?.shiping && (
            <div className='w-25'>
              <span className='text-dark d-flex align-items-center fs-3 mb-5'>
                <KTSVG path='/icons/gen018.svg' className='svg-icon-2x me-2' />
                Endereço de Entrega
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Logradouro:
                <span className='text-black-50 fs-5 fw-light'>{addresses?.shiping?.street}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Número:
                <span className='text-black-50 fs-5 fw-light'>{addresses?.shiping?.number}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Complemento:
                <span className='text-black-50 fs-5 fw-light'>
                  {addresses?.shiping?.complement}
                </span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Bairro:
                <span className='text-black-50 fs-5 fw-light'>
                  {addresses?.shiping?.neighborhood}
                </span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                CEP:
                <span className='text-black-50 fs-5 fw-light'>{addresses?.shiping?.zipCode}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Cidade:
                <span className='text-black-50 fs-5 fw-light'>{addresses?.shiping?.city}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Estado:
                <span className='text-black-50 fs-5 fw-light'>{addresses?.shiping?.state}</span>
              </span>
            </div>
          )}
        </div>
        <div>
          <span className='text-dark fw-bolder d-flex align-items-center fs-1 mb-10'>
            Informações do Pedido
          </span>
          <PurchaseItems items={transaction?.products} />
        </div>
      </div>
    </div>
  )
}
