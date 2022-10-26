import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IGetSale } from '../../../domain/usecases/interfaces/sale/getSale'
import { formatDate, formatDateToUTC, KTSVG } from '../../../helpers'
import { ISaleInformation } from '../../../interfaces/api-response/saleInformations'
import { cepMask } from '../../formatters/cepFormatter'
import { cpfMask } from '../../formatters/cpfFormatter'
import { phoneMask } from '../../formatters/phoneFormatter'
import { SaleItems } from '../tables/saleItems-list'

type Props = {
  id: string | string[] | undefined
  getSale: IGetSale
}

export function PageSaleInfo({ id, getSale }: Props) {
  const [sale, setSale] = useState<ISaleInformation>()

  const saleStatusMap: { [key: string]: string } = {
    canceled: 'Cancelado',
    failed: 'Negado',
    paid: 'Pago',
    pending: 'Aguardando pagamento',
  }

  const salePaymentMethodMap: { [key: string]: string } = {
    multi_method: '2 Cartões de Crédito',
    credit_card: 'Cartão de Crédito',
    boleto: 'Boleto',
    pix: 'Pix'
  }

  useEffect(() => {
    if (typeof id === 'string') {
      getSale.get(id)
        .then((sale) => {
          sale.status = saleStatusMap[sale.status] || sale.status
          sale.payment_method = salePaymentMethodMap[sale.payment_method] || sale.payment_method

          setSale(sale)
        })
        .catch(() => {
          toast.error('Não foi possível retornar os detalhes da venda')
        })
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
              {sale?.date && formatDate(formatDateToUTC(sale?.date), 'DD/MM/YYYY')}
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
          {sale?.payment_method === 'Boleto' && (
            <>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Código de barras:
                <span className='text-black-50 fs-5 fw-light'>{sale.bar_code}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                {sale.pdf && (
                  <Link href={sale?.pdf}>
                    <a className='fs-4' target='_black'>Baixar boleto</a>
                  </Link>
                )}
              </span>
            </>
          )}
          {sale?.payment_method === 'Cartão de Crédito' && (
            <>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Cartão:
                <span className='text-black-50 fs-5 fw-light'>{`**** **** **** ${sale.last_four_digits}`}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Número de Parcelas:
                <span className='text-black-50 fs-5 fw-light'>{sale.installments}</span>
              </span>
            </>
          )}
          {sale?.payment_method === 'Pix' && (
            <>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Pix Copia e Cola:
                <span className='text-black-50 fs-5 fw-light'>{sale.qr_code}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                {sale.qr_code_url && (
                  <Link href={sale.qr_code_url}>
                    <a className='fs-4' target='_black'>Visualizar código QR</a>
                  </Link>
                )}
              </span>
            </>
          )}
        </div>
        <div className='w-100'>
          <span className='text-dark fw-bolder d-block fs-1 mb-10'>
            {sale?.shipping_address ? 'Informações do Usuário e Entrega' : 'Informações do Usuário'}
          </span>
          <div className='d-flex gap-20'>
            <div className={sale?.shipping_address ? 'w-25' : 'w-50'}>
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
                <span className='text-black-50 fs-5 fw-light'>{cpfMask(sale?.user.cpf ?? '')}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                E-mail:
                <span className='text-black-50 fs-5 fw-light'>{sale?.user.email}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Telefone:
                <span className='text-black-50 fs-5 fw-light'>{phoneMask(sale?.user.phoneNumber ?? '')}</span>
              </span>
            </div>
            <div className={sale?.shipping_address ? 'w-25' : 'w-50'}>
              <span className='text-dark d-block fs-3 mb-5'>
                <KTSVG path='/icons/gen018.svg' className='svg-icon-2x me-2' />
                Endereço de Faturamento
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Logradouro:
                <span className='text-black-50 fs-5 fw-light'>
                  {sale?.billing_address.line_1.split(',')[1]}
                </span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Número:
                <span className='text-black-50 fs-5 fw-light'>
                  {sale?.billing_address.line_1.split(',')[0]}
                </span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Complemento:
                <span className='text-black-50 fs-5 fw-light'>{sale?.billing_address.line_2}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Bairro:
                <span className='text-black-50 fs-5 fw-light'>
                  {sale?.billing_address.line_1.split(',')[2]}
                </span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                CEP:
                <span className='text-black-50 fs-5 fw-light'>
                  {cepMask(sale?.billing_address.zip_code ?? '')}
                </span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Cidade:
                <span className='text-black-50 fs-5 fw-light'>{sale?.billing_address.city}</span>
              </span>
              <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                Estado:
                <span className='text-black-50 fs-5 fw-light'>{sale?.billing_address.state}</span>
              </span>
            </div>
            {sale?.shipping_address && (
              <div className='w-25'>
                <span className='text-dark d-flex align-items-center fs-3 mb-5'>
                  <KTSVG path='/icons/gen018.svg' className='svg-icon-2x me-2' />
                  Endereço de Entrega
                </span>
                <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                  Logradouro:
                  <span className='text-black-50 fs-5 fw-light'>
                    {sale?.shipping_address.line_1.split(',')[1]}
                  </span>
                </span>
                <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                  Número:
                  <span className='text-black-50 fs-5 fw-light'>
                    {sale?.shipping_address.line_1.split(',')[0]}
                  </span>
                </span>
                <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                  Complemento:
                  <span className='text-black-50 fs-5 fw-light'>
                    {sale?.shipping_address.line_2}
                  </span>
                </span>
                <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                  Bairro:
                  <span className='text-black-50 fs-5 fw-light'>
                    {sale?.shipping_address.line_1.split(',')[2]}
                  </span>
                </span>
                <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                  CEP:
                  <span className='text-black-50 fs-5 fw-light'>
                    {sale?.shipping_address.zip_code}
                  </span>
                </span>
                <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                  Cidade:
                  <span className='text-black-50 fs-5 fw-light'>{sale?.shipping_address.city}</span>
                </span>
                <span className='d-flex align-items-center gap-2 fw-bolder fs-4 mb-5'>
                  Estado:
                  <span className='text-black-50 fs-5 fw-light'>
                    {sale?.shipping_address.state}
                  </span>
                </span>
              </div>
            )}
          </div>
          <div>
            <span className='text-dark fw-bolder d-flex align-items-center fs-1 mb-10'>
              Informações do Pedido
            </span>
            {sale?.products && <SaleItems items={sale.products} />}
          </div>
        </div>
      </div>
    </div>
  )
}
