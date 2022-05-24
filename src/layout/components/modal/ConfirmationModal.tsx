import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { RiCloseLine } from 'react-icons/ri'

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
        <button
          type='submit'
          className={`btn btn-lg mb-5 align-items-center justify-content-center d-flex btn-primary w-25`}
          form='create-category-form'
          disabled={loading}
          onClick={onConfimation}
        >
          {loading ? <Spinner animation='border' /> : 'Confirmar'}
        </button>
        <button
          type='button'
          className='btn btn-lg btn-secondary mb-5 w-min-120'
          onClick={onRequestClose}
          disabled={loading}
        >
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
