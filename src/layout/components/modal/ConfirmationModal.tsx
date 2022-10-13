import React from 'react'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../helpers'
import { Button } from '../buttons/CustomButton'

type ConfirmationModalProps = {
  loading: boolean
  isOpen: boolean
  title: string
  content: string
  onRequestClose: () => void
  onConfimation: () => void
}
function ConfirmationModal({
  isOpen,
  onRequestClose,
  onConfimation,
  loading,
  title,
  content,
}: ConfirmationModalProps) {
  return (
    <Modal show={isOpen} onHide={onRequestClose} className='mt-20'>
      <div className='modal-header'>
        <h5 className='modal-title'>{title}</h5>
        <button
          className='btn btn-icon btn-sm btn-active-light-primary ms-2'
          aria-label='Close'
          onClick={onRequestClose}
        >
          <KTSVG path='/icons/arr061.svg' className='svg-icon svg-icon-2x' />
        </button>
      </div>

      <Modal.Body>{content}</Modal.Body>

      <Modal.Footer>
        <Button
          type='button'
          title='Cancelar'
          onClick={onRequestClose}
          size='sm'
          customClasses={['btn-secondary', 'mb-5', 'px-20']}
        />
        <Button
          type='button'
          title='Confirmar'
          onClick={onConfimation}
          disabled={loading}
          loading={loading}
          size='sm'
          customClasses={['btn-primary', 'mb-5']}
        />
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
