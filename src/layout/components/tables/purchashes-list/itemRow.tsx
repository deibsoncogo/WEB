import { maskedToMoney } from "../../../formatters/currenceFormatter"

type Props = {
  name: string
  price: number
  quantity: number
  total: number
}

export function ItemRow({ name, price, quantity, total }: Props) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7 text-overflow-custom'>
          {name}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {maskedToMoney(price)}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {quantity}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {maskedToMoney(total)}
        </span>
      </td>
    </tr>
  )
}
