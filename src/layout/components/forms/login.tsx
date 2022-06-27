import { useContext, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input } from '../inputs'

import jwtDecode from 'jwt-decode'
import { IToken } from '../../../interfaces/application/token'
import { toast } from 'react-toastify'
import { IUserSignIn } from '../../../domain/usecases/interfaces/user/userSignIn'
import { UserSignIn } from '../../../domain/models/userSignIn'
import { Button } from '../buttons/CustomButton'

type Props = {
  userLogin: IUserSignIn
}
export function FormLogin(props: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')

  const onChangeError = () => {
    if (formRef.current) {
      formRef.current.setErrors({})
    }
  }

  async function handleFormSubmit(data: IFormLogin) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().email('Insira um email válido.').required('Email é necessário.'),
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

  async function handleSignIn(data: IFormLogin) {
    setHasError(false)
    setLoading(true)
    try {
      const response = await props.userLogin.signIn(new UserSignIn(data.email, data.password))
      localStorage.setItem('name', response.name)
      localStorage.setItem('email', response.email)
      localStorage.setItem('access_token', response.accessToken)
      localStorage.setItem('expiration', jwtDecode<IToken>(response.accessToken).exp)
      router.push('/dashboard')
      toast.success('Login efetuado com sucesso')
    } catch (err: any) {
      setHasError(true)
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form className='form w-100' ref={formRef} onSubmit={handleFormSubmit}>
      {hasError && (
        <div className='alert alert-danger d-flex align-items-center p-5 mb-10'>
          <span>{message}</span>
        </div>
      )}

      <Input name='email' label='E-mail' placeholder='E-mail' onChange={onChangeError} />
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

      <Button
        title='Entrar'
        type='submit'
        loading={loading}
        customClasses={['btn-primary', 'mb-5', 'w-100']}
      />
    </Form>
  )
}
