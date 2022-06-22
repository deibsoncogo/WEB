import Link from "next/link"
import { useState } from "react"
import { PurchaseItems } from "../tables/purchashes-list/purchaseItems"

type Props = {
  transactionId: string
}

export function PurchaseDetails({ transactionId }: Props) {

  const [data, setData] = useState({
    transactionId,
    date: '2022-04-27',
  })

  return (
    <div className='border border-secondary p-5'>
      <div className='mb-10'>
        <span className='text-dark fw-bolder d-block fs-1 mb-10'>
          Informações da Transação
        </span>
        <div>
          <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
            Transação:
            <span className='text-black-50 fs-5'>
              {transactionId}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
            Data:
            <span className='text-black-50 fs-5'>
              {transactionId}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
            Status:
            <span className='text-black-50 fs-5'>
              {transactionId}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
            Método de pagamento:
            <span className='text-black-50 fs-5'>
              {transactionId}
            </span>
          </span>
          <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
            Código de barras:
            <span className='text-black-50 fs-5'>
              {transactionId}
            </span>
          </span>
          <Link href='/'>
            <a className='fs-4'>Baixar boleto</a>
          </Link>
        </div>
      </div>
      <div className='mb-10  w-100'>
        <span className='text-dark fw-bolder d-block fs-1 mb-10'>
          Informações do Usuário e Entrega
        </span>
        <div className='d-flex gap-20'>
          <div className='w-25'>
            <span className='text-dark d-block fs-3 mb-5'>
              Dados Pessoais
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Nome:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              CPF:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              E-mail:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Telefone:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
          </div>
          <div className='w-25'>
            <span className='text-dark d-block fs-3 mb-5'>
              Endereço de Faturamento
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Logradouro:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Número:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Complemento:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Bairro:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              CEP:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Cidade:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Estado:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
          </div>
          <div className='w-25'>
            <span className='text-dark d-block fs-3 mb-5'>
              Endereço de Entrega
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Logradouro:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Número:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Complemento:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Bairro:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              CEP:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Cidade:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
            <span className='d-flex align-items-center gap-2 text-body fs-4 mb-5'>
              Estado:
              <span className='text-black-50 fs-5'>
                {transactionId}
              </span>
            </span>
          </div>
        </div>
        <div>
          <span className='text-dark fw-bolder d-block fs-1 mb-10'>
            Informações do Pedido
          </span>
          <PurchaseItems />
        </div>
      </div>
    </div>
  )
}
