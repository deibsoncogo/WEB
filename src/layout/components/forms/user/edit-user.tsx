import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import {
  formatDateToUTC,
  validateIfCPFIsValid,
  validateStringWithNumber,
} from '../../../../helpers'
import { findCEP, ZipCodeProps } from '../../../../utils/findCEP'
import { levelOptions, roleOptions, stateOptions } from '../../../../utils/selectOptions'

import { DatePicker, Input, InputMasked, Select } from '../../inputs'

import { UnexpectedError } from '../../../../domain/errors/unexpected-error'
import { GrantedProduct } from '../../../../domain/models/grantedProduct'
import { IGetAllProducts } from '../../../../domain/usecases/interfaces/product/getAllProducts'
import { IGetUser } from '../../../../domain/usecases/interfaces/user/getUser'
import { IUpdateUser } from '../../../../domain/usecases/interfaces/user/updateUser'
import { IPartialPurchaseResponse } from '../../../../interfaces/api-response/purchasePartialResponse'
import { Button } from '../../buttons/CustomButton'
import { ProductsModal } from '../../modals/products'
import { ProductsTable } from '../../tables/products-list'
import { PurchasesTable } from '../../tables/purchashes-list'
import { isStrongPassword } from '../../../../domain/shared/reggexPatterns/isPasswordStrong'

type IFormEditUser = {
  id: string
  userRegister: IUpdateUser
  getUser: IGetUser
  getProducts: IGetAllProducts
  isCPFAlreadyRegistered: IUserVerifyCPF
}

export function FormEditUser({
  id,
  userRegister,
  getUser,
  isCPFAlreadyRegistered,
  getProducts,
}: IFormEditUser) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [updateUser, setUpdateUser] = useState(false)
  const [defaultValue, setDefaultValue] = useState<ZipCodeProps>()

  const [cpf, setCPF] = useState()

  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false)
  const [grantedProducts, setGrantedProducts] = useState<GrantedProduct[]>([])

  const [purchases, setPurchases] = useState<IPartialPurchaseResponse[]>([
    {
      date: '2022-06-22',
      transactionId: '123456',
      totalPrice: 1200,
      status: 'Pago',
    },
  ])

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
        email: Yup.string().email('Insira um e-mail válido.').required('E-mail é necessário'),
        cpf: Yup.string().test({
          name: 'is valid',
          message: 'CPF inválido',
          test: (value) => (value ? validateIfCPFIsValid(value) : true),
        }),
        role: Yup.string().required('Permissão é necessária'),
      })
      await schema.validate(data, { abortEarly: false })

      const dataToSend = formatDataToSend(data)
      handleUpdateUser(dataToSend)
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
    const validatedCpf = matchesCPF?.join('')

    const matchesPhone = data.phoneNumber.match(/\d*/g)
    const phoneNumber = matchesPhone?.join('')

    const matchesCEP = data.zipCode.match(/\d*/g)
    const zipCode = matchesCEP?.join('')

    const userData = {
      id,
      name: data.name,
      email: data.email,
      cpf: validatedCpf || null,
      birthDate: data?.birthDate
        ? formatDateToUTC(data.birthDate).toISOString().split('T')[0]
        : null,
      phoneNumber: phoneNumber || null,
      role: data.role,
      level: data.level || null,
      address: [
        {
          zipCode: zipCode || null,
          street: data.street || null,
          neighborhood: data.neighborhood || null,
          city: data.city || null,
          state: data.state || null,
          number: data.number || null,
          complement: data.complement || null,
        },
      ],
      grantedProduct: grantedProducts,
    }

    return userData
  }

  async function updateUserRequest(data: any) {
    try {
      await userRegister.updateUser(data)
      router.push('/users')
      toast.success('Usuário editado com sucesso!')
    } catch (error: any) {
      if (error instanceof UnexpectedError) {
        toast.error('Erro Inesperado. Não foi possível atualizar o usuário.')
      }
    } finally {
      setUpdateUser(false)
    }
  }

  async function handleUpdateUser(data: any) {
    setUpdateUser(true)
    let hasAlreadyCPF = false
    if (data.cpf) {
      hasAlreadyCPF = await isCPFAlreadyRegistered.verifyUserCPF(data?.cpf)
    }

    if (cpf || !hasAlreadyCPF) {
      updateUserRequest(data)
    } else {
      formRef?.current?.setFieldError('cpf', 'CPF já registrado')
      setUpdateUser(false)
    }
  }

  useEffect(() => {
    if (!formRef.current) return

    getUser
      .getOne()
      .then((res) => {
        const newData: any = {
          name: res.name,
          email: res.email,
          birthDate: res?.birthDate ? formatDateToUTC(res?.birthDate) : '',
          cpf: res?.cpf || '',
          phoneNumber: res?.phoneNumber || '',
          level: res?.level || '',
          role: res.role,
          zipCode: res?.address[0]?.zipCode || '',
          street: res?.address[0]?.street || '',
          neighborhood: res?.address[0]?.neighborhood || '',
          city: res?.address[0]?.city || '',
          state: res?.address[0]?.state || '',
          number: res?.address[0]?.number || '',
          complement: res?.address[0]?.complement || '',
        }

        setGrantedProducts(res.grantedProduct)
        setCPF(newData.cpf)

        formRef.current?.setFieldValue('name', newData.name)
        formRef.current?.setFieldValue('email', newData.email)
        formRef.current?.setFieldValue('birthDate', newData.birthDate)
        formRef.current?.setFieldValue('cpf', newData.cpf)
        formRef.current?.setFieldValue('phoneNumber', newData.phoneNumber)
        formRef.current?.setFieldValue('level', newData.level)
        formRef.current?.setFieldValue('role', newData.role)
        formRef.current?.setFieldValue('zipCode', newData.zipCode)
        formRef.current?.setFieldValue('street', newData.street)
        formRef.current?.setFieldValue('neighborhood', newData.neighborhood)
        formRef.current?.setFieldValue('city', newData.city)
        formRef.current?.setFieldValue('number', newData.number)
        formRef.current?.setFieldValue('complement', newData.complement)
        formRef.current?.setFieldValue('state', newData.state)
      })
      .catch((err) => toast.error(err.messages))
  }, [])

  function inputAddress(result: ZipCodeProps) {
    formRef.current?.setFieldValue(
      'street',
      result?.street || formRef.current?.getFieldValue('street')
    )
    formRef.current?.setFieldValue('city', result?.city || formRef.current?.getFieldValue('city'))
    formRef.current?.setFieldValue(
      'state',
      result?.state || formRef.current?.getFieldValue('state')
    )
    formRef.current?.setFieldValue(
      'neighborhood',
      result?.neighborhood || formRef.current?.getFieldValue('neighborhood')
    )
  }

  async function handleInputZipCode() {
    const zipCode = formRef.current?.getData().zipCode
    const result = await findCEP(zipCode)
    if (result) inputAddress(result)
  }

  function handleInputCPF() {
    if (!formRef.current) return
    const inputCpf = formRef.current?.getData().cpf
    const matches = inputCpf?.match(/\d*/g)
    const number = matches?.join('')

    if (number?.length !== 11) return

    const result = validateIfCPFIsValid(formRef.current?.getData().cpf)
    if (!result) formRef.current.setFieldError('cpf', 'CPF inválido')
  }

  const dateBase = new Date()

  return (
    <>
      <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
        <div className='d-flex flex-row gap-5 w-100'>
          <div className='w-100'>
            <h3 className='mb-5'>Dados Pessoais</h3>

            <Input classes='h-75px' name='name' label='Nome' />
            <Input classes='h-75px' name='email' label='E-mail' type='email' disabled={true} />
            <DatePicker
              classes='h-75px'
              name='birthDate'
              label='Data de Nascimento'
              maxDate={new Date(dateBase.getFullYear() - 18, dateBase.getMonth(), dateBase.getDate())}
              maxYear={-17}
            />
            <InputMasked
              classes='h-75px'
              name='cpf'
              label='CPF'
              type='text'
              mask='999.999.999-99'
              disabled={!!cpf}
              onChange={handleInputCPF}
            />
            <InputMasked
              classes='h-75px'
              name='phoneNumber'
              label='Telefone'
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
            <Input classes='h-75px' name='number' label='Número' type='number' />
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

        <div className='d-flex justify-content-between gap-5'>
          <div className='w-50'>
            <h4 className='mb-5'>Acessos Concedidos</h4>
            <ProductsTable
              grantedProducts={grantedProducts}
              setGrantedProducts={setGrantedProducts}
            />
          </div>

          <div className='w-50'>
            <h4 className='mb-5'>Compras Realizadas</h4>
            <PurchasesTable userId={id} purchases={purchases} />
          </div>
        </div>

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
            onClick={() => {
              router.push('/users')
            }}
          />

          <Button
            type='submit'
            title='Salvar'
            customClasses={['px-20', 'btn-primary']}
            loading={updateUser}
            disabled={updateUser}
          />
        </div>
      </Form>

      <ProductsModal
        isOpen={isProductsModalOpen}
        modalTitle='Adicionar Produto Grátis'
        action={handleOpenModal}
        onRequestClose={() => {
          setIsProductsModalOpen(false)
        }}
        grantedProducts={grantedProducts}
        onAddProduct={setGrantedProducts}
        getProducts={getProducts}
      />
    </>
  )
}
