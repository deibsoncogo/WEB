import Modal from 'react-modal'
import { KTSVG } from '../../../helpers'
import { DatePicker, Select } from '../inputs'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  message: string
  action: () => Promise<void>
  onRequestClose: () => void
}

export function ProductsModal({ isOpen, modalTitle, message, action, onRequestClose }: NewTransactionModalProps) {
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
            <div className='d-flex align-items-center gap-20'>
              <div className='w-25'>
                <Select name='courses' label='Cursos'>
                  <option value='Curso 1'>
                    Curso 1
                  </option>
                </Select>
              </div>
              <DatePicker name='expireDate' label='Data de expiração' />
              <button type='button' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75' onClick={onRequestClose}>
                + Adicionar outro curso
              </button>
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
              <button type='button' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75' onClick={onRequestClose}>
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
              <button type='button' className='btn btn-outline-primary btn-sm border border-primary w-25 h-75' onClick={onRequestClose}>
                + Adicionar outro plano
              </button>
            </div>
          </div>

          <div className='modal-footer'>
            <button type='button' className='btn btn-primary' onClick={onRequestClose}>
              Adicionar
            </button>
            <button type='button' className='btn btn-light' onClick={action}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
