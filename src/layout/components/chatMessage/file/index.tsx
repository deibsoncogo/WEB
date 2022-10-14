import { Tooltip } from '@nextui-org/react'
import { ReactElement, useEffect, useState } from 'react'
import { KTSVG } from '../../../../helpers'
import { HourMask } from '../../../formatters/hourFormatter'
import { ImageViewer } from '../../modals/imageViewer'
import { Document } from './document'
import { CustomImage } from './image'

type FileProps = {
  fileURL: string
  hour: string
  fileType?: string
  fileOriginalName?: string
  setSelectedMessageToDelete: () => void
}
export const File = ({
  fileURL,
  hour,
  fileType,
  fileOriginalName,
  setSelectedMessageToDelete,
}: FileProps) => {
  const [image, setImage] = useState<ReactElement | null>(null)
  const [isToShowImageViewer, setIsToShowImageViewr] = useState(false)

  const handleShowFullImage = () => {
    setIsToShowImageViewr(true)
  }

  const handleCloseImageViewer = () => {
    setIsToShowImageViewr(false)
  }

  useEffect(() => {
    if (fileType === 'image') {
      setImage(<CustomImage imageURL={fileURL} onClick={handleShowFullImage} />)
    }
  }, [])

  return (
    <>
      <ImageViewer isOpen={!!isToShowImageViewer} close={handleCloseImageViewer} image={image} />

      <div className='p-0 rounded bg-light-primary text-dark fw-bold  d-flex justify-content-center position-relative mb-4'>
        <div
          className='d-flex justify-content-end p-2 position-absolute bg-light-primary rounded'
          style={{ right: 10, top: 10, zIndex: 999 }}
        >
          <Tooltip content={'Excluir'} rounded color='primary' onClick={setSelectedMessageToDelete}>
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </Tooltip>
        </div>

        {image ?? <Document fileURL={fileURL} fileOriginalName={fileOriginalName} />}

        <div className='ms-3 text-end position-absolute' style={{ bottom: 10, right: 20 }}>
          <span className='text-muted fs-7 fw-bold'>{HourMask(hour)}</span>
        </div>
      </div>
    </>
  )
}
