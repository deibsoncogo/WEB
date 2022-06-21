import { Tooltip } from '@nextui-org/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import { KTSVG } from '../../../../helpers'
import { IPartialProductResponse } from '../../../../interfaces/api-response/productsPartialResponse'
import { ActionModal } from '../../modals/action'

type Props = {
  id: string
  name: string
  expireDate: string
  setProducts: Dispatch<SetStateAction<IPartialProductResponse[]>>
}

export function Row({ id, name, expireDate, setProducts }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleRemoveProduct() {
    setProducts((prevState) => prevState.filter(product => product.id !== id))
    toast.success('Produto removido com sucesso')
  }

  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {expireDate}
        </span>
      </td>
      <td>
        <Tooltip content={'Remover'} rounded color='primary'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          >
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>

      <ActionModal
        isOpen={isModalOpen}
        modalTitle='Remover'
        message='Você tem certeza que deseja remover este produto?'
        action={handleRemoveProduct}
        onRequestClose={() => {
          setIsModalOpen(false)
        }}
      />
    </tr>
  )
}
