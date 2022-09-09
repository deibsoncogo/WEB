import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { KeyboardEventHandler } from 'react'
import { CreateCategoryParams } from '../../../domain/usecases/interfaces/category/createCategory'
import { Button } from '../buttons/CustomButton'
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

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') event.preventDefault()
  }

  return (
    <DrawerRight title='Nova Categoria' visible={visible} close={close}>
      <div className='mt-6 d-flex flex-column justify-content-between h-100'>
        <Form className='form' ref={ref} onSubmit={createCategory} id='create-category-form'>
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
            customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
          />

          <Button
            type='submit'
            form='create-category-form'
            customClasses={['px-20', 'btn-primary']}
            title='Salvar'
            loading={loading}
          />
        </div>
      </div>
    </DrawerRight>
  )
})
CreateCategoryDrawer.displayName = 'CreateCategoryDrawer'

export { CreateCategoryDrawer }
