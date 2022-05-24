import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { formatDateToSend } from '../../../helpers'
import { levelOptions, roleOptions } from '../../../utils/selectOptions'
import { DatePicker, Input, InputMasked, Select } from '../inputs'
import { api } from '../../../application/services/api'
import { IUpdateUser } from '../../../domain/usecases/interfaces/user/updateUser'
import { findCEP } from '../../../utils/findCep'

type IFormEditUser = {
  id: string
  userRegister: IUpdateUser
}

export function FormEditUser({ id, userRegister }: IFormEditUser) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [defaultValue, setDefaultValue] = useState({})

  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')

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

      const dataToSend = formatDataToSend(data)
      handleCreateUser(dataToSend)
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

  function formatDataToSend(data: any) {
    const matchesCPF = data.cpf.match(/\d*/g)
    const cpf = matchesCPF?.join('')

    const matchesPhone = data.phoneNumber.match(/\d*/g)
    const phoneNumber = matchesPhone?.join('')

    const matchesCEP = data.zipCode.match(/\d*/g)
    const zipCode = matchesCEP?.join('')

    const userData = {
      id,
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.password,
      cpf: cpf,
      photo: data.photo,
      birthDate: formatDateToSend(data.birthDate),
      phoneNumber: phoneNumber,
      role: data.role,
      address: [
        {
          zipCode: zipCode,
          street: data.street,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          number: data.number,
          complement: data.complement,
        },
      ],
    }

    return userData
  }

  async function handleCreateUser(data: any) {
    setHasError(false)
    try {
      await userRegister.updateUser(data)
      router.push('/users')
    } catch (err: any) {
      if (!err.response) return
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
    <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5'>Dados Pessoais</h3>

          <Input name='name' label='Nome' />
          <Input name='email' label='Email' type='email' />
          <DatePicker name='birthDate' label='Data de Nascimento' maxDate={new Date()} />
          <InputMasked name='cpf' label='CPF' mask='999.999.999-99' />
          <InputMasked name='phoneNumber' label='Telefone' mask='(99) 9 9999-9999' />
          <Input name='password' label='Senha' type='password' />

          <Select name='level' label='Nível de Conhecimento'>
            <option value='' disabled selected>
              Selecione
            </option>
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select name='role' label='Permissão'>
            <option value='' disabled selected>
              Selecione
            </option>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div className='w-100'>
          <h3 className='mb-5'>Endereço</h3>

          <InputMasked
            name='zipCode'
            label='CEP'
            mask='99999-999'
            onChange={() => {
              findCEP(formRef.current?.getData().zipCode, setDefaultValue)
            }}
          />
          <Input name='street' label='Logradouro' />
          <Input name='number' label='Número' type='number' />
          <Input name='complement' label='Complemento' />
          <Input name='neighborhood' label='Bairro' />
          <Input name='city' label='Cidade' />
          <Input name='state' label='Estado' />

          {hasError && (
            <div className='fv-row alert alert-danger mt-13'>
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>

      <div className='mb-10 d-flex justify-content-between '>
        <button
          type='button'
          onClick={() => {
            router.push('/users')
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