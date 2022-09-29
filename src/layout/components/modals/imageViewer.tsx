import { ReactElement } from 'react'
import Modal from 'react-modal'
import { KTSVG } from '../../../helpers'

type ImageViewerProps = {
  isOpen: boolean

  close: () => void
  image: ReactElement | null
}

export const ImageViewer = ({ isOpen, image, close }: ImageViewerProps) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName='react-modal-overlay'
      className='react-modal-image'
      onRequestClose={close}
      style={{ overlay: { zIndex: 999999 }, content: { maxWidth: '960px' } }}
    >
      <div className='position-relative d-flex justify-content-center align-itens-center'>
        <div
          className='position-absolute bg-light-primary rounded d-flex justify-content-center'
          style={{ right: 10, top: 10 }}
        >
          <div
            className='btn btn-icon btn-sm btn-active-light-primary ms-2'
            data-bs-dismiss='modal'
            aria-label='Close'
          >
            <span className='svg-icon svg-icon-1'></span>
          </div>
        </div>

        <div className='align-self-center image-viewer'>{image}</div>
      </div>
    </Modal>
  )
}
