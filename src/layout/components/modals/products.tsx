import Modal from 'react-modal'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { KTSVG } from '../../../helpers'
import { DatePicker, Select } from '../inputs'
import { IPartialProductResponse } from '../../../interfaces/api-response/productsPartialResponse'
import { toast } from 'react-toastify'
import { IGetAllProducts } from '../../../domain/usecases/interfaces/product/getAllProducts'
import { GrantedProduct } from '../../../domain/models/grantedProduct'
import { Product } from '../../../domain/models/product'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  action: () => Promise<void>
  onRequestClose: () => void
  grantedProducts: GrantedProduct[]
  onAddProduct: Dispatch<SetStateAction<GrantedProduct[]>>
  getProducts: IGetAllProducts
}

type SelectedProduct = {
  productId: string
  expireDate: Date
  product: Product
}

export function ProductsModal({
  isOpen,
  modalTitle,
  onRequestClose,
  grantedProducts,
  onAddProduct,
  getProducts
}: NewTransactionModalProps) {
  const formRef = useRef<FormHandles>(null)
  const [defaultValue, setDefaultValue] = useState({})
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])

  const [courses, setCourses] = useState<IPartialProductResponse[]>()
  const [plans, setPlans] = useState<IPartialProductResponse[]>()
  const [trainings, setTrainings] = useState<IPartialProductResponse[]>()
  const [products, setProducts] = useState<IPartialProductResponse[]>()

  function handleIncreaseProduct(fieldName: string, fieldExpireDate: string) {
    const name = formRef.current?.getFieldValue(fieldName)
    const expireDate = formRef.current?.getFieldValue(fieldExpireDate)

    if (!name) {
      toast.error('Selecione um produto!')
      return
    }

    if (!expireDate) {
      toast.error('Selecione uma data de expiração!')
      return
    }

    if (selectedProducts.some((selected) => selected.product.name === name)) {
      toast.error('Esse produto já foi selecionado!')
      return
    }

    const id = getProductId(name)
    const product = products?.find(prod => prod.id === id)
    
    const newGrantedProduct = new GrantedProduct(
      id,
      expireDate,
      product
    ) 

    setSelectedProducts((prevProducts) => [...prevProducts, newGrantedProduct])
  }

  function getProductId(name: string) {
    return products?.find((prod) => prod.name === name)?.id!
  }

  function setProductLabel(type: string) {
    return type === 'course' ? 'Cursos' : type === 'training' ? 'Treinamentos' : 'Planos'
  }

  function handleDecreaseProduct(id: string) {
    const filteredSelectedProducts = selectedProducts.filter((product) => product.productId !== id)

    setSelectedProducts(filteredSelectedProducts)
  }

  function checkIfAProductIsGranted() {
    let productName
    const isAProductGranted = grantedProducts.some((chosen) =>
      selectedProducts.some((selected) => {
        productName = selected.product.name
        return selected.productId === chosen.productId
      })
    )

    if (isAProductGranted) {
      toast.error(`O produto ${productName} já foi concedido!`)
      return true
    }
  }

  function handleAddProducts() {
    if (checkIfAProductIsGranted()) return
    
    if (selectedProducts.length === 0) {
      toast.error('Nenhum produto foi selecionado!')
      return
    }

    onAddProduct((prevState) => [...prevState, ...selectedProducts])
    setSelectedProducts([])
    onRequestClose()
    toast.success('Produtos concedidos com sucesso!')
  }

  function findProducts(type: string) {
    return products?.filter(prod => prod.type === type)
  }

  useEffect(() => {
    getProducts.getAll().then((res) => setProducts(res.data))
  }, [])

  useEffect(() => {
    setCourses(findProducts('course'))
    setPlans(findProducts('plan'))
    setTrainings(findProducts('training'))
  }, [products])

  useEffect(() => {
    selectedProducts.forEach((product) => {
      formRef.current?.setFieldValue(`${product.product.name}-expireDate`, product.expireDate)
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

          <Form className='form w-100' ref={formRef} initialData={defaultValue} onSubmit={() => {}}>
            <div className='modal-body'>
              {selectedProducts.length > 0 && (
                <>
                  {selectedProducts.map((selectedProduct) => (
                    <div key={selectedProduct.productId} className='container gap-20 row mh-175px overflow-auto'>
                      <div className='col w-50'>
                        <div className='d-flex align-items-center gap-5'>
                          <div className='w-75'>
                            <Select name={selectedProduct.product.name} label={setProductLabel(selectedProduct.product.type)} value={selectedProduct.product.name}>
                              <option value={selectedProduct.product.name}>{selectedProduct.product.name}</option>
                            </Select>
                          </div>
                          <DatePicker
                            name={`${selectedProduct.product.name}-expireDate`}
                            label='Data de expiração'
                          />
                        </div>
                      </div>
                      <div className='col align-self-end w-50 h-100 mb-8'>
                        <button
                          type='button'
                          title='Remover'
                          onClick={() => {
                            handleDecreaseProduct(selectedProduct.productId)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-n14'
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75'>
                      <Select name='course' label='Cursos'>
                        {courses?.map((course) => (
                          <option key={course.id} value={course.name}>
                            {course.name}
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
                        {trainings?.map((training) => (
                          <option key={training.id} value={training.name}>
                            {training.name}
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
                    + Adicionar outro treinamento
                  </button>
                </div>
              </div>

              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75'>
                      <Select name='plan' label='Planos'>
                        {plans?.map((plan) => (
                          <option key={plan.id} value={plan.name}>
                            {plan.name}
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
                    + Adicionar outro plano
                  </button>
                </div>
              </div>
            </div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' onClick={handleAddProducts}>
                Confirmar
              </button>
              <button
                type='button'
                className='btn btn-light'
                onClick={() => {
                  setSelectedProducts([])
                  onRequestClose()
                }}
              >
                Cancelar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
