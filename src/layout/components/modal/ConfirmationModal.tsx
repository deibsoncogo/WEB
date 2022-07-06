import React from 'react'
import { Modal } from 'react-bootstrap'
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
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{content}</Modal.Body>

      <Modal.Footer>

      <Button
          type='button'
          title='Cancelar'
          loading={loading}
          onClick={onRequestClose}
          size='sm'
          customClasses={['btn-secondary', 'mb-5', 'px-20']}
        />
        
        <Button
          type='button'
          title='Confirmar'
          onClick={onConfimation}
          disabled={loading}
          size='sm'
          customClasses={['btn-primary', 'mb-5']}
        />
       
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
