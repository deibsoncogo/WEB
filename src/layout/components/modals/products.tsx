import Modal from 'react-modal'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

import { KTSVG } from '../../../helpers'
import { DatePicker, Select } from '../inputs'
import { IPartialProductResponse } from '../../../interfaces/api-response/productsPartialResponse'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  action: () => Promise<void>
  onRequestClose: () => void
  onAddProduct: Dispatch<SetStateAction<IPartialProductResponse[]>>
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
  const [selectedProducts, setSelectedProducts] = useState([{}])

  const [numberOfCourses, setNumberOfCourses] = useState([0])
  const [numberOfTrainings, setNumberOfTrainings] = useState([0])
  const [numberOfPlans, setNumberOfPlans] = useState([0])

  const [availableProducts, setAvailableProducts] = useState([
    {
      id: '1',
      name: 'Day Trade - Do básico ao avançado',
      expireDate: '26/10/2022',
      type: 'Cursos',
    },
    {
      id: '2',
      name: 'Análises de Criptomoedas',
      expireDate: '26/10/2022',
      type: 'Cursos',
    },
    {
      id: '3',
      name: 'Segue o gráfico - Mensal',
      expireDate: '26/10/2022',
      type: 'Cursos',
    },
  ])

  async function handleIncreaseProduct(fieldName: string, fieldExpireDate: string) {
    const name = formRef.current?.getFieldValue(fieldName)
    const expireDate = formRef.current?.getFieldValue(fieldExpireDate)

    const newProduct = {
      name,
      label:
        fieldName === 'course' ? 'Cursos' : fieldName === 'training' ? 'Treinamentos' : 'Planos',
      expireDate: expireDate,
    }

    setSelectedProducts((prevProducts) => [...prevProducts, newProduct])
    console.log(selectedProducts)
  }

  function handleIncreaseCourse() {
    const length = numberOfCourses.length
    const newNumber = numberOfCourses[length - 1]
    setNumberOfCourses([...numberOfCourses, newNumber + 1])
  }

  function handleDecreaseCourse(index: number) {
    const temp = numberOfCourses.slice()
    temp.splice(index, 1)
    setNumberOfCourses(temp)
  }

  function handleAddProducts(data: SubmitHandler) {
    console.log(data)
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
              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  {numberOfCourses.map((number, index) => (
                    <div key={number} className='d-flex align-items-center gap-5'>
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
                      {number >= 1 && (
                        <button
                          type='button'
                          title='Remover'
                          onClick={() => {
                            handleDecreaseCourse(index)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-n14'
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className='col align-self-end w-50 h-100 mb-8'>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-sm border border-primary w-50 h-25  '
                    onClick={() => handleIncreaseCourse()}
                  >
                    + Adicionar outro curso
                  </button>
                </div>
              </div>

              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  {numberOfTrainings.map((number) => (
                    <div key={number} className='d-flex align-items-center gap-5'>
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
                      {number > 1 && (
                        <button
                          type='button'
                          title='Remover'
                          onClick={() => {
                            handleDecreaseCourse(number)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-n14'
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className='col align-self-end w-50 h-100 mb-8'>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-sm border border-primary w-50 h-25  '
                    onClick={() => handleIncreaseCourse()}
                  >
                    + Adicionar outro curso
                  </button>
                </div>
              </div>

              <div className='container gap-20 row mh-175px overflow-auto'>
                <div className='col w-50'>
                  {numberOfPlans.map((number) => (
                    <div key={number} className='d-flex align-items-center gap-5'>
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
                      {number > 1 && (
                        <button
                          type='button'
                          title='Remover'
                          onClick={() => {
                            handleDecreaseCourse(number)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-n14'
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className='col align-self-end w-50 h-100 mb-8'>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-sm border border-primary w-50 h-25  '
                    onClick={() => handleIncreaseCourse()}
                  >
                    + Adicionar outro curso
                  </button>
                </div>
              </div>
            </div>

            <div className='modal-footer'>

            <button type='button' className='btn btn-light px-10' onClick={onRequestClose}>
                Cancelar
              </button>

              <button type='submit' className='btn btn-primary px-10'>
                Confirmar
              </button>
             
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
