import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRef, useState } from 'react'
import Modal from 'react-modal'
import { formatDateToUTC, KTSVG } from '../../../helpers'
import { IPartialProductResponse } from '../../../interfaces/api-response/productsPartialResponse'
import { DatePicker, Select } from '../inputs'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  message: string
  action: () => Promise<void>
  onRequestClose: () => void
  onAddProduct: React.Dispatch<React.SetStateAction<IPartialProductResponse[]>>
}

export function ProductsModal({ isOpen, modalTitle, message, action, onRequestClose, onAddProduct }: NewTransactionModalProps) {
  const formRef = useRef<FormHandles>(null)

  const [defaultValue, setDefaultValue] = useState({})

  async function handleGrantProduct(data: IPartialProductResponse) {    
    if (!formRef.current) throw new Error()   

    try {      
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é Necessário'),
        expireDate: Yup.string().required('Data de nascimento é necessária')
      })
      await schema.validate(data, { abortEarly: false })
      console.log(data)

      const dataToSend = formatDataToSend(data)
      // handleCreateUser(dataToSend)
    } catch (err) {
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          // @ts-ignore
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)
      }
    }
  }

  function formatDataToSend(data: any) {
    const userData = {
      id,
      name: data.name,
      expireDate: formatDateToUTC(data.birthDate).toISOString().split('T')[0],
    }      

    return userData
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

          <div className='modal-body'>
            <div>
              <Form className='form d-flex align-items-center gap-20 w-100' ref={formRef} initialData={defaultValue} onSubmit={handleGrantProduct}>
                <div className='w-25'>
                  <Select name='courses' label='Cursos'>
                    <option value='Curso 1'>
                      Curso 1
                    </option>
                  </Select>
                </div>
                <DatePicker name='expireDate' label='Data de expiração' />
                <button type='submit' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75'>
                  + Adicionar outro curso
                </button>
              </Form>
            </div>
            <div className='d-flex align-items-center gap-20'>
              <div className='w-25'>
                <Select name='trainings' label='Treinamentos'>
                  <option value='Treinamento 1'>
                    Treinamento 1
                  </option>
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
                  <option value='Plano 1'>
                    Plano 1
                  </option>
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
