import { Tooltip } from '@nextui-org/react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import moment from 'moment'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'

import { toast } from 'react-toastify'
import { GrantedProduct } from '../../../domain/models/grantedProduct'
import { Product } from '../../../domain/models/product'
import { IGetAllProducts } from '../../../domain/usecases/interfaces/product/getAllProducts'
import { KTSVG } from '../../../helpers'
import { DatePicker, Input, Select } from '../inputs'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  action: () => Promise<void>
  onRequestClose: () => void
  grantedProducts: GrantedProduct[]
  onAddProduct: Dispatch<SetStateAction<GrantedProduct[]>>
  getProducts: IGetAllProducts
}

export function ProductsModal({
  isOpen,
  modalTitle,
  onRequestClose,
  grantedProducts,
  onAddProduct,
  getProducts,
}: NewTransactionModalProps) {
  const formRef = useRef<FormHandles>(null)
  const [defaultValue, setDefaultValue] = useState({})
  const [selectedProducts, setSelectedProducts] = useState<GrantedProduct[]>([])

  const [courses, setCourses] = useState<Product[]>()
  const [plans, setPlans] = useState<Product[]>()
  const [trainings, setTrainings] = useState<Product[]>()
  const [products, setProducts] = useState<Product[]>()

  function handleIncreaseProduct(fieldName: string, fieldExpireDate: string) {
    const name = formRef.current?.getFieldValue(fieldName)
    const expireDate = formRef.current?.getFieldValue(fieldExpireDate)

    if (!name) {
      formRef.current?.setFieldError(fieldName, 'Selecione um produto!')
      return
    }

    if (!expireDate) {
      formRef.current?.setFieldError(fieldExpireDate, 'Selecione uma data de expiração!')
      return
    }

    if (selectedProducts.some((selected) => selected.product.name === name)) {
      formRef.current?.setFieldError(fieldName, 'Esse produto já foi selecionado!')
      return
    }

    const id = getProductId(name)
    const product = products?.find((prod) => prod.id === id)!

    const newGrantedProduct = new GrantedProduct(id, expireDate, product)

    setSelectedProducts((prevProducts) => [...prevProducts, newGrantedProduct])
    formRef.current?.clearField(fieldName)
    formRef.current?.clearField(fieldExpireDate)
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

  function checkIfAProductIsGranted(name: string) {
    const productId = getProductId(name)
    return grantedProducts.some((chosen) => chosen.productId === productId)
  }

  function handleAddProducts() {
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
    const selectedProductsIds = selectedProducts.map((selectedProd) => selectedProd.productId)
    return products?.filter(
      (prod) =>
        prod.type === type &&
        !selectedProductsIds.includes(prod.id!) &&
        !checkIfAProductIsGranted(prod.name)
    )
  }

  useEffect(() => {
    getProducts
      .getAll({ name: '', order: 'asc', page: 1, allRecords: true })
      .then((res) => setProducts(res.data as any))
  }, [])

  useEffect(() => {
    setCourses(findProducts('course'))
    setPlans(findProducts('plan'))
    setTrainings(findProducts('training'))
  }, [products, selectedProducts, grantedProducts])

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
      <div className='modal-dialog modal-lg'>
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
              <div className='container gap-10 row mh-150px overflow-auto'>
                <div className='w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75 h-95px'>
                      <Select name='course' label='Cursos'>
                        <option value='' disabled selected>
                          Selecione um curso
                        </option>
                        {courses?.map((course) => (
                          <option key={course.id} value={course.name}>
                            {course.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className='w-50 h-95px'>
                      <DatePicker
                        name='courseExpireDate'
                        label='Data de Expiração'
                        minDate={moment().toDate()}
                        minYearAmount={0}
                      />
                    </div>
                  </div>
                </div>

                <div className='col align-self-end w-50 h-100 mb-8'>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-sm border border-primary w-200px h-25  '
                    onClick={() => handleIncreaseProduct('course', 'courseExpireDate')}
                  >
                    + Adicionar curso
                  </button>
                </div>
              </div>

              <div className='container gap-10 row mh-150px overflow-auto'>
                <div className='w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75 h-95px'>
                      <Select name='training' label='Treinamentos'>
                        <option value='' disabled selected>
                          Selecione um treinamento
                        </option>
                        {trainings?.map((training) => (
                          <option key={training.id} value={training.name}>
                            {training.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className='w-50 h-95px'>
                      <DatePicker
                        name='trainingExpireDate'
                        label='Data de Expiração'
                        minDate={moment().toDate()}
                        minYearAmount={0}
                      />
                    </div>
                  </div>
                </div>

                <div className='col align-self-end w-50 h-100 mb-8'>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-sm border border-primary w-200px h-25  '
                    onClick={() => handleIncreaseProduct('training', 'trainingExpireDate')}
                  >
                    + Adicionar treinamento
                  </button>
                </div>
              </div>

              <div className='container gap-10 row mh-150px overflow-auto'>
                <div className='w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75 h-95px'>
                      <Select name='plan' label='Planos'>
                        <option value='' disabled selected>
                          Selecione um plano
                        </option>
                        {plans?.map((plan) => (
                          <option key={plan.id} value={plan.name}>
                            {plan.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className='w-50 h-95px'>
                      <DatePicker
                        name='planExpireDate'
                        label='Data de Expiração'
                        minDate={moment().toDate()}
                        minYearAmount={0}
                      />
                    </div>
                  </div>
                </div>

                <div className='col align-self-end w-50 h-100 mb-8'>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-sm border border-primary w-200px h-25  '
                    onClick={() => handleIncreaseProduct('plan', 'planExpireDate')}
                  >
                    + Adicionar plano
                  </button>
                </div>
              </div>

              {selectedProducts.length > 0 && (
                <div className='mh-200px overflow-scroll'>
                  {selectedProducts.map((selectedProduct) => (
                    <div
                      key={selectedProduct.productId}
                      className='container gap-10 row mh-150px overflow-auto'
                    >
                      <div className='w-50'>
                        <div className='d-flex align-items-center gap-5'>
                          <div className='w-75 h-95px'>
                            <Input
                              name={selectedProduct.product.name}
                              label={setProductLabel(selectedProduct.product.type)}
                              value={selectedProduct.product.name}
                              disabled
                            />
                          </div>
                          <div className='w-50 h-95px'>
                            <DatePicker
                              name={`${selectedProduct.product.name}-expireDate`}
                              label='Data de Expiração'
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col align-self-end w-50 h-100 mb-8'>
                        <Tooltip
                          content='Deletar'
                          rounded
                          color='primary'
                          onClick={() => handleDecreaseProduct(selectedProduct.productId)}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='modal-footer'>
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
              <button type='button' className='btn btn-primary' onClick={handleAddProducts}>
                Confirmar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
