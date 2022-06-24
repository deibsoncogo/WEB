import Modal from 'react-modal'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { KTSVG } from '../../../helpers'
import { DatePicker, Select } from '../inputs'
import { IPartialProductResponse } from '../../../interfaces/api-response/productsPartialResponse'
import { makeRemoteGetAllProducts } from '../../../application/factories/usecases/remote-getAllProducts-factory'
import { GetProductsParams } from '../../../domain/usecases/interfaces/product/getAllProducts'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  action: () => Promise<void>
  onRequestClose: () => void
  onAddProduct: Dispatch<SetStateAction<IPartialProductResponse[]>>
}

type Product = {
  name: string
  label: string    
  expireDate: string
}

export function ProductsModal({
  isOpen,
  modalTitle,
  action,
  onRequestClose,
  onAddProduct,
}: NewTransactionModalProps) {
  const formRef = useRef<FormHandles>(null)
  const [defaultValue, setDefaultValue] = useState({})
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const [availableProducts, setAvailableProducts] = useState<IPartialProductResponse[]>([])

  function handleIncreaseProduct(fieldName: string, fieldExpireDate: string) {
    const name = formRef.current?.getFieldValue(fieldName)
    const expireDate = formRef.current?.getFieldValue(fieldExpireDate)

    if(selectedProducts.some(product => product.name === name)) return

    const newProduct = {
      name,
      label:
        fieldName === 'course' ? 'Cursos' : fieldName === 'training' ? 'Treinamentos' : 'Planos',
      expireDate: expireDate,
    }

    setSelectedProducts((prevProducts) => [...prevProducts, newProduct])
  }

  function handleDecreaseProduct(index: number) {
    const temp = selectedProducts.slice()
    temp.splice(index, 1)
    setSelectedProducts(temp)
  }

  function handleAddProducts(data: SubmitHandler) {
    console.log(data)
  }

  useEffect(() => {
    const paginationParams: GetProductsParams = {
      take: 10,
      page: 1,
      order: 'asc',
      name: '',
    }
    const getProducts = makeRemoteGetAllProducts()
    getProducts
      .getAll()
      .then((res) => {
        setAvailableProducts(res.data)
      })
  }, [])

  useEffect(() => {
    selectedProducts.forEach(product => {
      formRef.current?.setFieldValue(`${product.name}-expireDate`, product.expireDate)
    })
  }, [selectedProducts])

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
              type='button'
              className='btn btn-icon btn-sm btn-active-light-primary ms-2'
              aria-label='Close'
              onClick={onRequestClose}
            >
              <KTSVG path='/icons/arr061.svg' className='svg-icon svg-icon-2x' />
            </button>
          </div>

          <Form
            className='form w-100'
            ref={formRef}
            initialData={defaultValue}
            onSubmit={handleAddProducts}
          >
            <div className='modal-body'>
              {selectedProducts.length > 0 && (
                <div className='container gap-20 row mh-175px overflow-auto'>
                  <div className='col w-50'>
                    {selectedProducts.map((product, index) => (
                      <div key={index} className='d-flex align-items-center gap-5'>
                        <div>
                          <Select name={product.name} label={product.label} value={product.name}>                            
                            <option value={product.name}>
                              {product.name}
                            </option>
                          </Select>
                        </div>

                      <DatePicker name={`${product.name}-expireDate`} label='Data de expiração' />
                      <button
                        type='button'
                        title='Remover'
                        onClick={() => {
                          handleDecreaseProduct(index)
                        }}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-n14'
                      >
                        x
                      </button>
                    </div>
                    ))}
                  </div>
                </div>
              )}

              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75'>
                      <Select name='course' label='Cursos'>
                        {availableProducts.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <DatePicker name='courseExpireDate' label='Data de expiração' />
                  </div>
                </div>

                <div className='col align-self-end w-50 h-100 mb-8'>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-sm border border-primary w-50 h-25  '
                    onClick={() => handleIncreaseProduct('course', 'courseExpireDate')}
                  >
                    + Adicionar outro curso
                  </button>
                </div>
              </div>

              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75'>
                      <Select name='training' label='Treinamentos'>
                        {availableProducts.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <DatePicker name='trainingExpireDate' label='Data de expiração' />
                  </div>
                </div>

                <div className='col align-self-end w-50 h-100 mb-8'>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-sm border border-primary w-50 h-25  '
                    onClick={() => handleIncreaseProduct('training', 'trainingExpireDate')}
                  >
                    + Adicionar outro curso
                  </button>
                </div>
              </div>

              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75'>
                      <Select name='plan' label='Planos'>
                        {availableProducts.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <DatePicker name='planExpireDate' label='Data de expiração' />
                  </div>
                </div>

                <div className='col align-self-end w-50 h-100 mb-8'>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-sm border border-primary w-50 h-25  '
                    onClick={() => handleIncreaseProduct('plan', 'planExpireDate')}
                  >
                    + Adicionar outro curso
                  </button>
                </div>
              </div>
            </div>

            <div className='modal-footer'>
              <button type='submit' className='btn btn-primary'>
                Confirmar
              </button>
              <button type='button' className='btn btn-light' onClick={() => {
                setSelectedProducts([])
                onRequestClose()
              }}>
                Cancelar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
