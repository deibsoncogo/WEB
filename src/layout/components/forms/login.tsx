import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input } from '../inputs'

export function FormLogin() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  async function handleFormSubmit(data: any) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().email('Insira um email válido.').required('Email é nescessário.'),
        password: Yup.string().required('Senha é nescessária'),
      })
      await schema.validate(data, { abortEarly: false })

      router.push('/dashboard')
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
      <Input name='password' label='Senha' placeholder='Senha' type='password' />

      <div className='mb-10 d-flex justify-content-between '>
        <div className='form-check form-check-custom form-check-solid'>
          <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
          <label className='form-check-label' htmlFor='flexCheckDefault'>
            Manter conectado
          </label>
        </div>

        <Link href='#'>Esqueceu a senha?</Link>
      </div>

      <button type='submit' className='btn btn-lg btn-primary w-100 mb-5'>
        Save
      </button>
    </Form>
  )
}
