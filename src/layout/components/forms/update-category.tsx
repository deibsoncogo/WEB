import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React from 'react'
import { UpdateCategoryParams } from '../../../domain/usecases/interfaces/category/updateCategory'
import { Button } from '../buttons/CustomButton'
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
          <Button
            type='submit'
            form='update-category-form'
            size='lg'
            customClasses={['btn-primary', 'mb-5', 'px-20']}
            title='Salvar'
            loading={loading}
          />

          <Button
            title='Cancelar'
            type='button'
            onClick={close}
            size='lg'
            customClasses={['btn-secondary', 'mb-5', '', 'px-20']}
          />
        </div>
      </div>
    </DrawerRight>
  )
})
UpdateCategoryDrawer.displayName = 'UpdateCategoryDrawer'

export { UpdateCategoryDrawer }
