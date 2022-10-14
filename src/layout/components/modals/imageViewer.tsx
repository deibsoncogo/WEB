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
      <div className='align-self-center image-viewer'>
        <div
          className='position-absolute bg-light-primary rounded d-flex justify-content-center'
          style={{ right: 10, top: 10 }}
          onClick={close}
        >
          <button
            className='btn btn-icon btn-sm btn-active-light-primary'
            aria-label='Close'
            onClick={close}
          >
            <KTSVG path='/icons/arr061.svg' className='svg-icon svg-icon-2x' />
          </button>
        </div>
        {image}
      </div>
    </Modal>
  )
}
