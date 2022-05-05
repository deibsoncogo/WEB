import { useRef } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input } from '../inputs'

export function FormForgotPassword() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  async function handleFormSubmit(data: any) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().email('Insira um email válido.').required('Email é nescessário.'),
      })
      await schema.validate(data, { abortEarly: false })

      router.push('/')
    } catch (err) {
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          // @ts-ignore
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)
      }
    }
  }

  return (
    <Form className='form w-100' ref={formRef} onSubmit={handleFormSubmit}>
      <Input name='email' label='E-mail' placeholder='E-mail' type='email' />

      <div className='mb-10 d-flex justify-content-between '>
        <button
          type='button'
          onClick={() => {
            router.push('/')
          }}
          className='btn btn-lg btn-secondary w-150px mb-5'
        >
          Cancelar
        </button>

        <button type='submit' className='btn btn-lg btn-primary w-100px mb-5'>
          Save
        </button>
      </div>
    </Form>
  )
}
