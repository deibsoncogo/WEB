import { KTSVG } from '../../../../helpers'

interface IRow {
  name: string
  email: string
  birthDate: string
  cpf: string
  address: string
}

export function Row({ name, email, birthDate, cpf, address }: IRow) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{name}</span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{email}</span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{birthDate}</span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{cpf}</span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{address}</span>
      </td>
      <td className='text-end'>
        <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/gen019.svg' className='svg-icon-3' />
        </a>
        <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
        </a>
        <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </a>
      </td>
    </tr>
  )
}
