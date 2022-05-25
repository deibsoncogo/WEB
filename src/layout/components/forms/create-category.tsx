import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React from 'react'
import { CreateCategoryParams } from '../../../domain/usecases/interfaces/category/createCategory'
import CustomButton from '../buttons/CustomButton'
import { DrawerRight } from '../drawerRight/DrawerRight'
import { Input } from '../inputs'

type Props = {
  visible: boolean
  close: () => void
  loading: boolean
  createCategory: (params: CreateCategoryParams) => void
}

const CreateCategoryDrawer = React.forwardRef<FormHandles, Props>((props, ref) => {
  const { close, createCategory, loading, visible } = props
  return (
    <DrawerRight title='Nova Categoria' visible={visible} close={close}>
      <div className='mt-6 d-flex flex-column justify-content-between h-100'>
        <Form className='form' ref={ref} onSubmit={createCategory} id='create-category-form'>
          <Input name='name' label='Nome' placeholder='Nome da categoria' type='text' />
        </Form>

        <div className='mb-10 d-flex justify-content-between'>
          <CustomButton
            type='submit'
            form='create-category-form'
            customClasses={['btn-primary', 'w-25']}
            title='Salvar'
            loading={loading}
          />

          <CustomButton
            customClasses={['btn-secondary', 'mb-5', 'px-20']}
            title='Cancelar'
            loading={loading}
          />
        </div>
      </div>
    </DrawerRight>
  )
})
CreateCategoryDrawer.displayName = 'CreateCategoryDrawer'

export { CreateCategoryDrawer }
