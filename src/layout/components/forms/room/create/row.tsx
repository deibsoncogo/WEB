import { Tooltip } from '@nextui-org/react'
import { IStreamingRoom } from '../../../../../domain/models/streamingRoom'
import { KTSVG } from '../../../../../helpers'

interface IRow {
  index: number
  liveDate: string
  time: string
  start?: boolean
  startUrl?: string
  streamingRoomArray: IStreamingRoom[]
  handleRefresher: () => void
}

export function Row({index, liveDate, time, start, startUrl, streamingRoomArray, handleRefresher}: IRow) {

  const deleteStream = (indexArray: number) => {
    streamingRoomArray.splice(indexArray, 1) 
    handleRefresher()
  }

  return (
    <>
      <tr>
        <td className='ps-4'>
          <span className='text-dark fw-bold d-block fs-7'>{liveDate}</span>
        </td>

        <td>
          <span className='text-dark fw-bold d-block fs-7'>{time}</span>
        </td>

        <td>
        {start && (
          <a href={startUrl} target='_blank' rel='noreferrer'>
            <button
              type='button'
              className='btn btn-bg-light btn-active-color-primary btn-sm text-info border border-gray-400'
            >
              Começar aula ao vivo
            </button>
          </a>
        )}
      </td>

        <td className = 'text-end'>
          <Tooltip content={'Deletar'} rounded color='primary'>
            <a
              onClick={() => {
                deleteStream(index)
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
            >
              <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
            </a>
          </Tooltip>
        </td>
      </tr>
    </>
  )
}
