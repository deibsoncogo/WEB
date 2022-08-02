import { Tooltip } from "@nextui-org/react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import { IDeleteFreeContent } from "../../../../domain/usecases/interfaces/freeContent/deleteFreeContent"
import { KTSVG } from "../../../../helpers"
import ConfirmationModal from "../../modal/ConfirmationModal"

interface IRow {
  id: string
  customerName: string
  purchaseDate: string
  product: string
  transactionId: string
  total: string
  status: string
  handleRefresher: () => void;

}

export function Row({
  id,
  customerName,
  purchaseDate,
  product,
  transactionId,
  total,
  status,
  handleRefresher
 
}: IRow) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const [loading, setLoading] = useState(false)

   return (
    <>
      <tr>
        <td className='ps-4'>
          <span className='text-dark fw-bold d-block fs-7'>{customerName}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7 text-overflow-custom'>{purchaseDate}</span>
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
       
        <td className='text-end d-flex justify-content-start px-4'>
          <Tooltip content={'Editar'} rounded color='primary'>
            <Link href={`/freeContent/edit/${id}`}>
              <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
              </button>
            </Link>
          </Tooltip>

          <Tooltip content={'Deletar'} rounded color='primary'>
            <button
              onClick={() => {
                setIsModalDeleteOpen(true)
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
            >
              <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
            </button>
          </Tooltip>
        </td>     
      </tr>
    </>
  )
}
