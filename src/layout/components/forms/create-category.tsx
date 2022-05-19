import { Form } from '@unform/web'
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { DrawerRight } from '../drawerRight/DrawerRight'
import { Input } from '../inputs'

type Props = {
  visible: boolean
  close: () => void
}

function CreateCategory({ visible, close }: Props) {
  return (
    <DrawerRight title='Nova Categoria' visible={visible} close={close}>
      <div className='mt-6 d-flex flex-column justify-content-between h-100'>
        <Form className='form'>
          <Input name='name' label='Nome' placeholder='Nome da categoria' type='text' />
        </Form>

        <div className='mb-10 d-flex justify-content-between'>
          <button type='submit' className='btn btn-lg btn-primary w-25 mb-5'>
            Salvar
          </button>
          <button type='button' className='btn btn-lg btn-secondary w-25 mb-5'>
            Cancelar
          </button>
        </div>
      </div>
    </DrawerRight>
  )
}

export default CreateCategory
