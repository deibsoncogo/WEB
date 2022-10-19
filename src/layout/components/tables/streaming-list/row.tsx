import { KTSVG } from '../../../../helpers'

interface IRow {
  index: number
  liveDate: string
  time: string
  start?: boolean
  startUrl: string
  removeStreamItem: (index: number) => void
}

export function Row({ index, liveDate, time, start, startUrl, removeStreamItem }: IRow) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{liveDate}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>{time}</span>
      </td>
      <td>
        {start && startUrl && (
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

      <td className='text-end d-flex justify-content-end'>
        <button
          type='button'
          onClick={() => {
            removeStreamItem(index)
          }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-5 text-start'
        >
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
      </td>
    </tr>
  )
}
