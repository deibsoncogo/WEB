import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { KeyboardEventHandler } from 'react'
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

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') event.preventDefault()
  }

  return (
    <DrawerRight title='Editar Categoria' visible={visible} close={close}>
      <div className='mt-6 d-flex flex-column justify-content-between h-100'>
        <Form className='form' ref={ref} onSubmit={updateCategory} id='update-category-form'>
          <Input
            name='name'
            label='Nome'
            placeholder='Nome da categoria'
            type='text'
            tabIndex={0}
            onKeyDown={handleKeyDown}
          />
        </Form>

        <div className='d-flex mb-15'>
          <Button
            title='Cancelar'
            type='button'
            onClick={close}
            size='lg'
            customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
          />

          <Button
            type='submit'
            form='update-category-form'
            size='lg'
            customClasses={['px-20', 'btn-primary']}
            title='Salvar'
            loading={loading}
          />
        </div>
      </div>
    </DrawerRight>
  )
})
UpdateCategoryDrawer.displayName = 'UpdateCategoryDrawer'

export { UpdateCategoryDrawer }
