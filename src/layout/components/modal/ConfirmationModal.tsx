import React from 'react'
import { Modal } from 'react-bootstrap'
import CustomButton from '../buttons/CustomButton'

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
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <CustomButton
          type='button'
          customClasses={['btn-primary', 'w-25']}
          title='Confirmar'
          onClick={onConfimation}
          disabled={loading}
        />

        <CustomButton
          type='button'
          customClasses={['btn-secondary', 'mb-5', 'px-20']}
          title='Cancelar'
          loading={loading}
          onClick={onRequestClose}
        />
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
