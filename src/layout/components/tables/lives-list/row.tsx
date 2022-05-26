import { KTSVG } from '../../../../helpers'

interface IStreamList {
  liveDate: string
  time: string
  start: boolean
}

interface IRow {
  index: number
  liveDate: string
  time: string
  start?: boolean
  removeStreamItem: (index: number) => void
}

export function Row({ index, liveDate, time, start, removeStreamItem }: IRow) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{liveDate}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>{time}</span>
      </td>
      <td>
        {start && (
          <button
            type='button'
            className='btn btn-bg-light btn-active-color-primary btn-sm text-info border border-gray-400'
          >
            Começar aula ao vivo
          </button>
        )}
      </td>

      <td className='text-end'>
        <button
          type='button'
          onClick={() => {
            removeStreamItem(index)
          }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-5'
        >
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
      </td>
    </tr>
  )
}
