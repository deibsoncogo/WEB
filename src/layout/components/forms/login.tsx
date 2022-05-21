import { useContext, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input } from '../inputs'
import { api } from '../../../application/services/api'

import { IAuthResponse } from '../../../interfaces/api-response/authResponse'
import jwtDecode from 'jwt-decode'
import { IToken } from '../../../interfaces/application/token'

export function FormLogin() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')

  async function handleFormSubmit(data: any) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().email('Insira um email válido.').required('Email é nescessário.'),
        password: Yup.string().required('Senha é necessária'),
      })
      await schema.validate(data, { abortEarly: false })

      handleSignIn(data)
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

  async function handleSignIn(data: any) {
    setHasError(false)
    try {
      const response = await api.post('/auth/admin/login', data)
      const result: IAuthResponse = response.data.data
      localStorage.setItem('name', result.name)
      localStorage.setItem('email', result.email)
      localStorage.setItem('access_token', result.accessToken)
      localStorage.setItem('expiration', jwtDecode<IToken>(result.accessToken).exp)
      router.push('/dashboard')
    } catch (err: any) {
      console.log(err)
      setHasError(true)
      if (err.response.status === 500) {
        setMessage(err.message)
        return
      }
      if (Array.isArray(err.response.data.message)) setMessage(err.response.data.message[0])
      else setMessage(err.response.data.message)
    }
  }

  return (
    <Form className='form w-100' ref={formRef} onSubmit={handleFormSubmit}>
      {hasError && (
        <div className='alert alert-danger d-flex align-items-center p-5 mb-10'>
          <span>{message}</span>
        </div>
      )}

      <Input name='email' label='E-mail' placeholder='E-mail' type='email' />
      <Input name='password' label='Senha' placeholder='Senha' type='password' />

      <div className='mb-10 d-flex justify-content-between '>
        <div className='form-check form-check-custom form-check-solid'>
          <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
          <label className='form-check-label' htmlFor='flexCheckDefault'>
            Manter conectado
          </label>
        </div>

        <Link href='/password'>Esqueceu a senha?</Link>
      </div>

      <button type='submit' className='btn btn-lg btn-primary w-100 mb-5'>
        Entrar
      </button>
    </Form>
  )
}
