import { KTSVG } from '../../../../helpers'

interface IRow {
  id: string
  name: string
  description: string
  price: string | number
  teacher: string
}

export function Row({ id, name, description, price, teacher }: IRow) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>
      <td>
        <span
          className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'
          title={description}
        >
          {description}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{price}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{teacher}</span>
      </td>
      <td>
        <button className='btn btn-icon btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/com003.svg' className='svg-icon-3' />
        </button>
      </td>
      <td>
        <div className='form-check form-switch form-check-custom form-check-solid'>
          <input className='form-check-input' type='checkbox' value='' id='flexSwitchDefault' />
        </div>
      </td>

      <td className='text-end'>
        <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
        </button>
        <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
      </td>
    </tr>
  )
}
