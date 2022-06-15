import Modal from 'react-modal'
import { formatDateToUTC, KTSVG } from '../../../helpers'
import { IPartialProductResponse } from '../../../interfaces/api-response/productsPartialResponse'
import { DatePicker, Select } from '../inputs'
import { Dispatch, SetStateAction, useState } from 'react'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  message: string
  action: () => Promise<void>
  onRequestClose: () => void
  onAddProduct: Dispatch<SetStateAction<IPartialProductResponse[]>>
}

export function ProductsModal({ isOpen, modalTitle, message, action, onRequestClose, onAddProduct }: NewTransactionModalProps) {
  const [grantedProducts, setGrantedProducts] = useState([
    {
      id: '1',
      name: 'Day Trade - Do básico ao avançado',
      expireDate: '26/10/2022',
      type: 'Cursos'
    },
    {
      id: '2',
      name: 'Análises de Criptomoedas',
      expireDate: '26/10/2022',
      type: 'Cursos'
    },
    {
      id: '3',
      name: 'Segue o gráfico - Mensal',
      expireDate: '26/10/2022',
      type: 'Cursos'
    },
  ])

  const [selectedProducts, setSelectedProducts] = useState([
    {
      id: '1',
      name: 'Day Trade - Do básico ao avançado',
      expireDate: '26/10/2022',
      type: 'Cursos'
    },
  ])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content min-vw-100'
    >
      <div className='modal-dialog modal-xl'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{modalTitle}</h5>
            <button
              className='btn btn-icon btn-sm btn-active-light-primary ms-2'
              aria-label='Close'
              onClick={onRequestClose}
            >
              <KTSVG path='/icons/arr061.svg' className='svg-icon svg-icon-2x' />
            </button>
          </div>

          <div className='modal-body'>
            {selectedProducts && (
              selectedProducts.map(product => (
                <div key={product.id} className='d-flex align-items-center gap-18'>
                  <div className='w-25'>
                    <Select name='courses' label={product.type} fixedValue={product.name} disabled>
                      <option>
                        {product.name}
                      </option>
                    </Select>
                  </div>
                  <DatePicker name='expireDate' label='Data de expiração' />
                </div>
              ))
            )}
            <div className='d-flex align-items-center gap-20'>
              <div className='w-25'>
                <Select name='courses' label='Cursos'>
                  {grantedProducts.map(product => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </Select>
              </div>
              <DatePicker name='expireDate' label='Data de expiração' />
              <button type='submit' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75'>
                + Adicionar outro curso
              </button>
            </div>
            <div className='d-flex align-items-center gap-20'>
              <div className='w-25'>
                <Select name='trainings' label='Treinamentos'>
                  {grantedProducts.map(product => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </Select>
              </div>
              <DatePicker name='expireDate' label='Data de expiração' />
              <button type='button' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75'>
                + Adicionar outro treinamento
              </button>
            </div>
            <div className='d-flex align-items-center gap-20'>
              <div className='w-25'>
                <Select name='plans' label='Planos'>
                  {grantedProducts.map(product => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </Select>
              </div>
              <DatePicker name='expireDate' label='Data de expiração' />
              <button type='button' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75'>
                + Adicionar outro plano
              </button>
            </div>
          </div>

          <div className='modal-footer'>
            <button type='button' className='btn btn-primary' onClick={action}>
              Adicionar
            </button>
            <button type='button' className='btn btn-light'>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
