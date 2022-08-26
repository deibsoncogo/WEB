import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import { KTSVG } from '../../../../../../helpers'
import { HourMask } from '../../../../../formatters/hourFormatter'
import { Document } from './document'

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
  return (
    <div className='p-0 rounded bg-light-primary text-dark fw-bold  d-flex justify-content-center position-relative'>
      <div
        className='d-flex justify-content-end p-2 position-absolute bg-light-primary rounded'
        style={{ right: 20, top: 10, zIndex: 999 }}
      >
        <Tooltip content={'Deletar'} rounded color='primary' onClick={setSelectedMessageToDelete}>
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </Tooltip>
      </div>

      {fileType === 'image' ? (
        <Image
          width={500}
          height={500}
          src={fileURL}
          alt='Chat message'
          className='rounded w-100'
        />
      ) : (
        <Document fileURL={fileURL} fileOriginalName={fileOriginalName} />
      )}

      <div className='ms-3 text-end position-absolute' style={{ bottom: 10, right: 20 }}>
        <span className='text-muted fs-7 fw-bold'>{HourMask(hour)}</span>
      </div>
    </div>
  )
}
