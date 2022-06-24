import Modal from 'react-modal'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { KTSVG } from '../../../helpers'
import { DatePicker, Select } from '../inputs'
import { IPartialProductResponse } from '../../../interfaces/api-response/productsPartialResponse'
import { IGetAllCourses } from '../../../domain/usecases/interfaces/course/getAllCourses'
import { IGetAllPlans } from '../../../domain/usecases/interfaces/plans/getAllPlans'
import { IGetAllTrainings } from '../../../domain/usecases/interfaces/trainings/getAllTrainings'
import { toast } from 'react-toastify'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  action: () => Promise<void>
  onRequestClose: () => void
  onAddProduct: Dispatch<SetStateAction<IPartialProductResponse[]>>
  getCourses: IGetAllCourses
  getPlans: IGetAllPlans
  getTrainings: IGetAllTrainings
}

type Product = {
  id: string
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
  getCourses,
  getPlans,
  getTrainings
}: NewTransactionModalProps) {
  const formRef = useRef<FormHandles>(null)
  const [defaultValue, setDefaultValue] = useState({})
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  
  const [courses, setCourses] = useState<IPartialProductResponse[]>()
  const [plans, setPlans] = useState<IPartialProductResponse[]>()
  const [trainings, setTrainings] = useState<IPartialProductResponse[]>()

  function handleIncreaseProduct(fieldName: string, fieldExpireDate: string) {
    const name = formRef.current?.getFieldValue(fieldName)
    
    if(selectedProducts.some(product => product.name === name)) return
    
    const expireDate = formRef.current?.getFieldValue(fieldExpireDate) 
    const id = getProductId(fieldName, name)

    const newProduct = {
      id,
      name,
      label:
        fieldName === 'courses' ? 'Cursos' : fieldName === 'trainings' ? 'Treinamentos' : 'Planos',
      expireDate: expireDate,
    }

    setSelectedProducts((prevProducts) => [...prevProducts, newProduct])
  }

  function getProductId(type: string, name: string) {
    return type === 'courses' ? courses?.find(course => course.name === name)?.id! :
      type === 'trainings' ? trainings?.find(training => training.name === name)?.id! :
      plans?.find(plan => plan.name === name)?.id!
  }

  function handleDecreaseProduct(id: string) {
    const filteredSelectedProducts = selectedProducts.filter(product => product.id !== id)

    setSelectedProducts(filteredSelectedProducts)
  } 

  function handleAddProducts() {
    setSelectedProducts([])
    onAddProduct(selectedProducts)
    onRequestClose()
    toast.success('Produtos concedidos com sucesso!')
  }

  useEffect(() => {    
    getCourses
      .getAll().then((res) => setCourses(res.data))

    getTrainings
      .getAll().then((res) => setTrainings(res.data))

    getPlans
      .getAll().then((res) => setPlans(res.data))
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
                      <div key={product.id} className='d-flex align-items-center gap-5'>
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
                          handleDecreaseProduct(product.id)
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
                      <Select name='courses' label='Cursos'>
                        {courses?.map((product) => (
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
                    onClick={() => handleIncreaseProduct('courses', 'courseExpireDate')}
                  >
                    + Adicionar outro curso
                  </button>
                </div>
              </div>

              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75'>
                      <Select name='trainings' label='Treinamentos'>
                        {trainings?.map((product) => (
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
                    onClick={() => handleIncreaseProduct('trainings', 'trainingExpireDate')}
                  >
                    + Adicionar outro curso
                  </button>
                </div>
              </div>

              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='w-75'>
                      <Select name='plans' label='Planos'>
                        {plans?.map((product) => (
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
                    onClick={() => handleIncreaseProduct('plans', 'planExpireDate')}
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
