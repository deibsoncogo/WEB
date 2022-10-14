import Modal from 'react-modal'
import { KTSVG } from '../../../helpers'

type NewTransactionModalProps = {
  isOpen: boolean
  modalTitle: string
  message: string
  action: () => Promise<void>
  onRequestClose: () => void
}

export function ActionModal({
  isOpen,
  modalTitle,
  message,
  action,
  onRequestClose,
}: NewTransactionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <div className='modal-dialog'>
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

          <div className='modal-body text-center'>
            <p className='fs-5'>{message}</p>
          </div>

          <div className='modal-footer'>
            <button type='button' className='btn btn-light' onClick={onRequestClose}>
              Cancelar
            </button>
            <button type='button' className='btn btn-primary' onClick={action}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
