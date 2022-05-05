import { useRef } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input } from '../inputs'

export function FormResetPassword() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  async function handleFormSubmit(data: any) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        password: Yup.string().min(6, 'No mínimo 6 caracteres').required('Senha é nescessária'),
        confirm_password: Yup.string()
          .min(6, 'No mínimo 6 caracteres')
          .oneOf([Yup.ref('password'), null], 'As senhas devem ser idênticas')
          .required('Senha é nescessária'),
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
      <Input name='password' label='Senha' placeholder='Senha' type='password' />
      <Input
        name='confirm_password'
        label='Confirmação da Senha'
        placeholder='Confirmação da Senha'
        type='password'
      />

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

        <button type='submit' className='btn btn-lg btn-primary w-180px mb-5'>
          Redefinir senha
        </button>
      </div>
    </Form>
  )
}
