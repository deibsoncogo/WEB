import Link from 'next/link'

interface IRow {
  id: string
  customerName: string
  purchaseDate: string
  product: string
  transactionId: string
  total: string
  status: string
  handleRefresher: () => void
}

export function Row({
  id,
  customerName,
  purchaseDate,
  product,
  transactionId,
  total,
  status,
  handleRefresher,
}: IRow) {
  return (
    <>
      <tr>
        <td className='ps-4'>
          <span className='text-dark fw-bold d-block fs-7'>{customerName}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7 text-overflow-custom'>
            {purchaseDate}
          </span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{product}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{transactionId}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{total}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{status}</span>
        </td>

        <td className='text-end d-flex justify-content-end px-4'>
          <Link href={`/sales/show/${id}`}>
            <a className='primary border-2 border-bottom border-secondary'>Visualizar</a>
          </Link>
        </td>
      </tr>
    </>
  )
}
