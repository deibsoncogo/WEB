import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import { UpdateCategoryParams } from '../../../domain/usecases/interfaces/category/updateCategory'
import { DrawerRight } from '../drawerRight/DrawerRight'
import { Input } from '../inputs'

type Props = {
  visible: boolean
  close: () => void
  loading: boolean
  updateCategory: (params: UpdateCategoryParams) => void
}

const UpdateCategoryDrawer = React.forwardRef<FormHandles, Props>((props, ref) => {
  const { close, updateCategory, loading, visible } = props
  return (
    <DrawerRight title='Editar Categoria' visible={visible} close={close}>
      <div className='mt-6 d-flex flex-column justify-content-between h-100'>
        <Form className='form' ref={ref} onSubmit={updateCategory} id='update-category-form'>
          <Input name='name' label='Nome' placeholder='Nome da categoria' type='text' />
        </Form>

        <div className='mb-10 d-flex justify-content-between'>
          <button
            type='submit'
            className={`btn btn-lg mb-5 align-items-center justify-content-center d-flex btn-primary w-25`}
            form='update-category-form'
            disabled={loading}
          >
            {loading ? <Spinner animation='border' /> : 'Salvar'}
          </button>
          <button
            type='button'
            className='btn btn-lg btn-secondary mb-5 w-min-120'
            onClick={close}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </DrawerRight>
  )
})
UpdateCategoryDrawer.displayName = 'UpdateCategoryDrawer'

export { UpdateCategoryDrawer }
