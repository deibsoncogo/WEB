import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { findCEP } from '../../../utils/findCep'
import { DatePicker, Input, InputMasked, Select } from '../inputs'
import { Address } from '../../../domain/models/address'
import { UserSignUp } from '../../../domain/models/userSignUp'
import { levelOptions, roleOptions } from '../../../utils/selectOptions'
import { IUserSignUp } from '../../../domain/usecases/interfaces/user/userSignUP'
import { toast } from 'react-toastify'

type Props = {
  userRegister: IUserSignUp
}

export function FormCreateUser({ userRegister }: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [cepObj, setCEPObj] = useState({})
  const [defaultValue, setDefaultValue] = useState({})

  async function handleFormSubmit(data: IFormCreateUser) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é necessário'),
        email: Yup.string().email('Insira um email válido.').required('Email é necessário'),
        birthDate: Yup.string().required('Data de nascimento é necessária'),
        cpf: Yup.string().required('CPF é necessário'),
        phoneNumber: Yup.string().required('Telefone é necessário'),
        level: Yup.string().required('Nível de conhecimento é necessário'),
        password: Yup.string().min(6, 'No mínimo 6 caracteres').required('Senha é necessária'),
        role: Yup.string().required('Permissão é necessária'),
        zipCode: Yup.string().required('CEP é necessário'),
        street: Yup.string().required('Rua é necessário'),
        neighborhood: Yup.string().required('Bairro é necessário'),
        city: Yup.string().required('Cidade é necessária'),
        state: Yup.string().required('Estado é necessário'),
        number: Yup.string().required('Número é necessário'),
      })
      await schema.validate(data, { abortEarly: false })

      handleCreateUser(data)
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

  async function handleCreateUser(data: any) {
    const matchesCPF = data.cpf.match(/\d*/g)
    const cpf = matchesCPF?.join('')

    const matchesPhone = data.phoneNumber.match(/\d*/g)
    const phoneNumber = matchesPhone?.join('')

    const matchesCEP = data.zipCode.match(/\d*/g)
    const zipCode = matchesCEP?.join('')

    const address = new Address(
      zipCode,
      data.street,
      data.neighborhood,
      data.city,
      data.state,
      data.number,
      data.complement
    )

    const user = new UserSignUp(
      data.name,
      data.email,
      data.password,
      data.password,
      cpf,
      data.birthDate,
      phoneNumber,
      data.role,
      data.level,
      address
    )

    userRegister
      .signUp(user)
      .then(() => router.push('/users'))
      .catch((error: any) => toast.error(error.messages))
  }

  return (
    <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5'>Dados Pessoais</h3>

          <Input name='name' label='Nome' type='text' />
          <Input name='email' label='Email' type='email' />
          <DatePicker name='birthDate' label='Data de Nascimento' maxDate={new Date()} />
          <InputMasked name='cpf' label='CPF' type='text' mask='999.999.999-99' />
          <InputMasked name='phoneNumber' label='Telefone' type='text' mask='(99) 9 9999-9999' />

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
          <Input name='password' label='Senha' type='password' />

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
