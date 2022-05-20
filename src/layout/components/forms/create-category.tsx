import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useRef } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { CreateCategoryParams } from '../../../domain/usecases/interfaces/category/createCategory'
import { DrawerRight } from '../drawerRight/DrawerRight'
import { Input } from '../inputs'
import * as Yup from 'yup'
import { Category } from '../../../interfaces/model/Category'
import { applyYupValidation } from '../../../helpers/applyYupValidation'

type Props = {
  visible: boolean
  close: () => void
  createCategory: (params: CreateCategoryParams) => void
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é Nescessário'),
})

function CreateCategoryDrawer({ visible, close, createCategory }: Props) {
  const formRef = useRef<FormHandles>(null)

  async function handleFormSubmit(data: Category) {
    if (!formRef.current) throw new Error()

    const formData = applyYupValidation<typeof schema>(schema, data)

    console.log(formData)

    try {
      formRef.current.setErrors({})
      await schema.validate(data, { abortEarly: false })
      createCategory(data)
    } catch (err) {
      const validationErrors = {} as any
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message
          }
        })
      }
      formRef.current.setErrors(validationErrors)
    }
  }
  return (
    <DrawerRight title='Nova Categoria' visible={visible} close={close}>
      <div className='mt-6 d-flex flex-column justify-content-between h-100'>
        <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
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

export { CreateCategoryDrawer }
