import Link from 'next/link'


type Products = {
  id: number,
  name: string,
  expireDate: string
}

export function Row({ id, name, expireDate }: Products) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>
      <td>
        <span
          className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'
        >
          {expireDate}
        </span>
      </td>
    </tr>
  )
}
