import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { DatePicker, Input, InputMasked, Select } from '../../inputs'
import { Address } from '../../../../domain/models/address'
import { UserSignUp } from '../../../../domain/models/userSignUp'
import { levelOptions, roleOptions, stateOptions } from '../../../../utils/selectOptions'
import { toast } from 'react-toastify'
import { IUserSignUp } from '../../../../domain/usecases/interfaces/user/userSignUp'
import { findCEP, ZipCodeProps } from '../../../../utils/findCEP'
import { restrictNumberInput } from '../../../../utils/restrictNumberInput'
import { ProductsModal } from '../../modals/products'
import { ProductsTable } from '../../tables/products-list'
import { IPartialProductResponse } from '../../../../interfaces/api-response/productsPartialResponse'
import { validateIfCPFIsValid, validateStringWithNumber } from '../../../../helpers'
import { Button } from '../../buttons/CustomButton'

type Props = {
  userRegister: IUserSignUp
  verifyEmail: IUserVerifyEmail
}

export function FormCreateUser({ userRegister, verifyEmail }: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [defaultValue, setDefaultValue] = useState<ZipCodeProps>()

  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false)
  const [registerUser, setRegisterUser] = useState(false)

  const [grantedProducts, setGrantedProducts] = useState<IPartialProductResponse[]>([])

  async function handleOpenModal() {
    try {
      setIsProductsModalOpen(false)
      toast.success('Produtos adicionados com sucesso!')
    } catch (err: any) {
      toast.error(err.messages[0])
    }
  }

  async function handleFormSubmit(data: IFormCreateUser) {
    if (!formRef.current) throw new Error()
    
   
    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string()
          .test('no number', 'O campo não deve conter números', validateStringWithNumber)
          .required('Nome é necessário'),          
        email: Yup.string().email('Insira um email válido.').required('Email é necessário'),
        cpf:  Yup.string().test(
        {name: 'is valid',
        message: 'CPF inválido',
        test: (value) => value? validateIfCPFIsValid(value): true}),                   
        password: Yup.string().min(6, 'No mínimo 6 caracteres'),
        role: Yup.string().required('Permissão é necessária'),       
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

    try {
      await verifyEmail.verifyUserEmail(user.email)
    } catch (err: any) {     
      if (!formRef.current) return
      formRef.current.setFieldError('email', 'Email já registrado')
    }

    setRegisterUser(true)
    userRegister
      .signUp(user)
      .then(() => {
          toast.success('Usuário cadastrado com sucesso')
          router.push('/users')
        })
      .catch((error: any) => {        
        toast.error(error.messages[0])
      })
      .finally(() =>
      setRegisterUser(false))
  }

  function handleInputCPF() {
    if (!formRef.current) return
    const cpf = formRef.current?.getData().cpf
    const matches = cpf?.match(/\d*/g)
    const number = matches?.join('')

    if (number?.length !== 11) return

    const result = validateIfCPFIsValid(formRef.current?.getData().cpf)
    if (!result) formRef.current.setFieldError('cpf', 'CPF invalido')
  }

  async function handleInputZipCode() {
    const zipCode = formRef.current?.getData().zipCode
    const result = await findCEP(zipCode)
    setDefaultValue(result)
  }

  return (
    <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5'>Dados Pessoais</h3>

          <Input classes='h-75px' name='name' label='Nome' type='text' />
          <Input classes='h-75px' name='email' label='Email' type='email' />
          <DatePicker
            classes='h-75px'
            name='birthDate'
            label='Data de Nascimento'
            maxDate={new Date('01/01/2003')}
          />
          <InputMasked
            classes='h-75px'
            name='cpf'
            label='CPF'
            type='text'
            mask='999.999.999-99'
            onChange={handleInputCPF}
          />
          <InputMasked
            classes='h-75px'
            name='phoneNumber'
            label='Telefone'
            type='text'
            mask='(99) 9 9999-9999'
          />

          <Select classes='h-75px' name='level' label='Nível de Conhecimento'>
            <option value='' disabled selected>
              Selecione
            </option>
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Input classes='h-75px' name='password' label='Senha' type='password' />

          <Select classes='h-75px' name='role' label='Permissão'>
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
            classes='h-75px'
            name='zipCode'
            label='CEP'
            mask='99999-999'
            onChange={handleInputZipCode}
          />
          <Input classes='h-75px' name='street' label='Logradouro' />
          <Input
            classes='h-75px'
            name='number'
            label='Número'
            type='number'
            onKeyDown={restrictNumberInput}
            min='0'
          />
          <Input classes='h-75px' name='complement' label='Complemento' />
          <Input classes='h-75px' name='neighborhood' label='Bairro' />
          <Input classes='h-75px' name='city' label='Cidade' />

          <Select classes='h-75px' name='state' label='Estado'>
            <option value='' selected={!!defaultValue?.state}>
              Selecione
            </option>
            {stateOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                selected={defaultValue?.state === option.value}
              >
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {grantedProducts && (
        <div className='w-50'>
          <h4 className='mb-5'>Acessos concedidos</h4>
          <ProductsTable products={grantedProducts} setProducts={setGrantedProducts} />
        </div>
      )}

      <div className='w-100'>
        <button
          type='button'
          className='btn btn-outline-primary border border-primary w-180px mb-5'
          onClick={() => {
            setIsProductsModalOpen(true)
          }}
        >
          Adicionar produto grátis
        </button>
      </div>

      <div className='d-flex mt-10'>
        <Button
          title='Cancelar'
          type='button'
          customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
          loading={registerUser}
          onClick={() => {
            router.push('/users')
          }}
        />

        <Button type='submit'
         title='Salvar' 
         customClasses={['px-20', 'btn-primary']}
         disabled={registerUser} />
      </div>

      <ProductsModal
        isOpen={isProductsModalOpen}
        modalTitle='Adicionar produto grátis'
        action={handleOpenModal}
        onRequestClose={() => {
          setIsProductsModalOpen(false)
        }}
        onAddProduct={setGrantedProducts}
      />
    </Form>
  )
}
