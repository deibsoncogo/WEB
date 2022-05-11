import { useRef } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input } from '../inputs'

export function FormCreateUer() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  async function handleFormSubmit(data: IFormCreateUser) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é Nescessário'),
        email: Yup.string().email('Insira um email válido.').required('Email é nescessário'),
        birthDate: Yup.string().required('Data de nascimento é nescessária'),
        cpf: Yup.string().required('CPF é nescessário'),
        phoneNumber: Yup.string().required('Telefone é nescessário'),
        level: Yup.string().required('Nível de conhecimento é nescessário'),
        password: Yup.string().min(6, 'No mínimo 6 caracteres').required('Senha é nescessária'),
        role: Yup.string().required('Premissão é nescessária'),
        zipCode: Yup.string().required('CEP é nescessário'),
        street: Yup.string().required('Rua é nescessário'),
        neighborhood: Yup.string().required('Bairro é nescessário'),
        city: Yup.string().required('Cidade é nescessária'),
        state: Yup.string().required('Estado é nescessário'),
        number: Yup.string().required('Número é nescessário'),
      })
      await schema.validate(data, { abortEarly: false })
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
    <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5'>Dados Pessoais</h3>

          <Input name='name' label='Nome' type='text' />
          <Input name='email' label='Email' type='email' />
          <Input name='birthDate' label='Data de Nascimento' type='date' />
          <Input name='cpf' label='CPF' type='text' />
          <Input name='phoneNumber' label='Telefone' type='number+' />
          <Input name='level' label='Nível de Conhecimento' type='text' />
          <Input name='password' label='Senha' type='password' />
          <Input name='role' label='Permissão' type='text' />
        </div>
        <div className='w-100'>
          <h3 className='mb-5'>Endereço</h3>

          <Input name='zipCode' label='CEP' type='number' />
          <Input name='street' label='Logradouro' type='text' />
          <Input name='number' label='Número' type='number' />
          <Input name='complement' label='Complemento' type='text' />
          <Input name='neighborhood' label='Bairro' type='text' />
          <Input name='city' label='Cidade' type='text' />
          <Input name='state' label='Estado' type='text' />
        </div>
      </div>

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
          Salvar
        </button>
      </div>
    </Form>
  )
}
