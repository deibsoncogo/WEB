import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input, InputMasked, Select } from '../inputs'
import axios from 'axios'
import { api } from '../../../application/services/api'

export function FormCreateUer() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [cepObj, setCEPObj] = useState({})
  const [defaultValue, setDefaultValue] = useState({})

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

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.password,
      cpf: cpf,
      photo: data.photo,
      birthDate: data.birthDate,
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

    try {
      await api.post('/user', userData)
    } catch (err) {
      console.log(err)
    }
  }

  async function findCEP() {
    const cep = formRef.current?.getData().zipCode
    const matches = cep.match(/\d*/g)
    const number = +matches?.join('')

    if (number <= 9999999 || number > 99999999) return

    try {
      const resp = await axios.get(`https://viacep.com.br/ws/${number}/json/`)
      const data = {
        zipCode: resp.data.cep,
        street: resp.data.logradouro,
        neighborhood: resp.data.bairro,
        city: resp.data.localidade,
        state: resp.data.uf,
      }
      setDefaultValue(data)
    } catch (err) {
      console.log(err)
    }
  }

  const levelOptions = [
    { value: 'basic', label: 'Básico' },
    { value: 'intermediary', label: 'Intermediário' },
    { value: 'advanced', label: 'Avançado' },
  ]

  const roleOptions = [
    { value: 'user', label: 'Usuário' },
    { value: 'admin', label: 'Administrador' },
  ]

  return (
    <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5'>Dados Pessoais</h3>

          <Input name='name' label='Nome' type='text' />
          <Input name='email' label='Email' type='email' />
          <Input name='birthDate' label='Data de Nascimento' type='date' />
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

          <InputMasked name='zipCode' label='CEP' mask='99999-999' onChange={findCEP} />
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
