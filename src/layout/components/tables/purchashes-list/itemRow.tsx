type Props = {
  name: string
  price: string
  quantity: string
  total: string
}

export function ItemRow({ name, price, quantity, total }: Props) {
  return (
    <tr>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {name}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {price}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {quantity}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {total}
        </span>
      </td>
    </tr>
  )
}
