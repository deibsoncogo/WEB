import Modal from 'react-modal'
import { formatDateToUTC, KTSVG } from '../../../helpers'
import { IPartialProductResponse } from '../../../interfaces/api-response/productsPartialResponse'
import { DatePicker, Select } from '../inputs'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  action: () => Promise<void>
  onRequestClose: () => void
  onAddProduct: Dispatch<SetStateAction<IPartialProductResponse[]>>
}

export function ProductsModal({ isOpen, modalTitle, action, onRequestClose, onAddProduct }: NewTransactionModalProps) {
  const formRef = useRef<FormHandles>(null)
  const [defaultValue, setDefaultValue] = useState({})

  const [availableProducts, setAvailableProducts] = useState([
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
      name: 'Day Trade - Do básico ao avançado',
      expireDate: '26-10-2022',
      label: 'Cursos'
    },
  ])

  async function handleAddProduct(fieldName: string, fieldExpireDate: string) {
    const name = formRef.current?.getFieldValue(fieldName)
    const expireDate = formRef.current?.getFieldValue(fieldExpireDate)

    const newProduct = {
      name,
      label: fieldName === 'course' ? 'Cursos' : fieldName === 'training' ? 'Treinamentos' : 'Planos',
      expireDate: expireDate
    }
    
    setSelectedProducts((prevProducts) => [...prevProducts, newProduct])
  }

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

          <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={() => {}}>
            <div className='modal-body'>
              {selectedProducts && (
                selectedProducts.map(product => (
                  <div key={product.name} className='d-flex align-items-center gap-18'>
                    <div className='w-25'>
                      <Select name={product.name} label={product.label} fixedValue={product.name} disabled>
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
                    <Select name='course' label='Cursos'>
                      {availableProducts.map(product => (
                        <option key={product.id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <DatePicker name='courseExpireDate' label='Data de expiração' />
                  <button type='button' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75' onClick={() => handleAddProduct('course', 'courseExpireDate')}>
                    + Adicionar outro curso 
                  </button>
                </div>
                <div className='d-flex align-items-center gap-20'>
                  <div className='w-25'>
                    <Select name='training' label='Treinamentos'>
                      {availableProducts.map(product => (
                        <option key={product.id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <DatePicker name='trainingExpireDate' label='Data de expiração' />
                  <button type='button' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75' onClick={() => handleAddProduct('training', 'trainingExpireDate')}>
                    + Adicionar outro treinamento
                  </button>
                </div>
                <div className='d-flex align-items-center gap-20'>
                  <div className='w-25'>
                    <Select name='plan' label='Planos'>
                      {availableProducts.map(product => (
                        <option key={product.id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <DatePicker name='planExpireDate' label='Data de expiração' />
                  <button type='button' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75' onClick={() => handleAddProduct('plan', 'planExpireDate')}>
                    + Adicionar outro plano
                  </button>
                </div>            
            </div>

            <div className='modal-footer'>
              <button type='submit' className='btn btn-primary'>
                Confirmar
              </button>
              <button type='button' className='btn btn-light' onClick={onRequestClose}>
                Cancelar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
