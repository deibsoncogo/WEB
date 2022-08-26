import { Tooltip } from '@nextui-org/react'
import { KTSVG } from '../../../../../../helpers'
import { HourMask } from '../../../../../formatters/hourFormatter'

type TextProps = {
  text: string
  hour: string
  setSelectedMessageToDelete: () => void
}
export const Text = ({ hour, text, setSelectedMessageToDelete }: TextProps) => {
  return (
    <div className='p-5 pt-3 rounded bg-light-primary text-dark fw-bold w-75 text-start'>
      <div className='text-end mb-2 d-flex justify-content-end'>
        <Tooltip content={'Deletar'} rounded color='primary' onClick={setSelectedMessageToDelete}>
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </Tooltip>
      </div>

      <div className='ms-3'>
        <span className='text-dark fs-7 mb-1 text-break'>{text}</span>
      </div>

      <div className='ms-3 text-end'>
        <span className='text-muted fs-7 mb-1'>{HourMask(hour)}</span>
      </div>
    </div>
  )
}
