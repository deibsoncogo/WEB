import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input } from '../inputs'
import { api } from '../../../application/services/api'
import { Button } from '../buttons/CustomButton'

export function FormForgotPassword() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')

  async function handleFormSubmit(data: any) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().email('Insira um email válido.').required('Email é nescessário.'),
      })
      await schema.validate(data, { abortEarly: false })

      handleSendRequest(data)
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

  async function handleSendRequest(data: any) {
    setHasError(false)
    setLoading(true)
    try {
      const response = await api.post('/auth/forgotPassword', data)
      router.push('/')
    } catch (err: any) {
      setHasError(true)
      if (err.response.status === 500) {
        setMessage(err.message)
        return
      }
      setMessage(err.response.data.message[0])
    }
    setLoading(false)
  }

  return (
    <Form className='form w-100' ref={formRef} onSubmit={handleFormSubmit}>
      {hasError && (
        <div className='alert alert-danger d-flex align-items-center p-5 mb-10'>
          <span>{message}</span>
        </div>
      )}

      <Input name='email' label='E-mail' placeholder='E-mail' type='email' />

      <div className='mb-10 d-flex justify-content-between'>
        <Button
          title='Cancelar'
          type='button'
          size='sm'
          onClick={() => {
            router.push('/')
          }}
          customClasses={['btn-secondary', 'mb-5']}
        />

        <Button
          title='Enviar'
          type='submit'
          size='sm'
          loading={loading}
          customClasses={['btn-primary', 'mb-5']}
        />
      </div>
    </Form>
  )
}
