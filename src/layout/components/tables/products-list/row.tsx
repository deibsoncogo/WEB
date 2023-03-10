import { Tooltip } from '@nextui-org/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import { GrantedProduct } from '../../../../domain/models/grantedProduct'
import { formatDate, KTSVG } from '../../../../helpers'
import { ActionModal } from '../../modals/action'

type Props = {
  id: string
  name: string
  expireDate: Date
  setGrantedProducts: Dispatch<SetStateAction<GrantedProduct[]>>
}

export function Row({ id, name, expireDate, setGrantedProducts }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleRemoveProduct() {
    setGrantedProducts((prevState) => prevState.filter((product) => product.productId !== id))
    toast.success('Produto removido com sucesso!')
  }

  return (
    <tr>
      <td className='ps-4'>
        <span className='text-black-50 d-block fs-7'>{name}</span>
      </td>
      <td>
        <span className='text-black-50 d-block fs-7 mw-200px text-overflow-custom'>
          {formatDate(expireDate, 'DD/MM/YYYY')}
        </span>
      </td>
      <td className='d-flex justify-content-start'>
        <Tooltip content={'Remover'} rounded color='primary'>
          <button
            type='button'
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
