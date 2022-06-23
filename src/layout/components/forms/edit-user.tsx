import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { toast } from 'react-toastify'
import { FormHandles } from '@unform/core'

import { findCEP } from '../../../utils/findCEP'
import { formatDateToUTC } from '../../../helpers'
import { levelOptions, roleOptions } from '../../../utils/selectOptions'

import { DatePicker, Input, InputMasked, Select } from '../inputs'

import { IGetUser } from '../../../domain/usecases/interfaces/user/getUser'
import { IUpdateUser } from '../../../domain/usecases/interfaces/user/updateUser'
import { IPartialProductResponse } from '../../../interfaces/api-response/productsPartialResponse'
import { ProductsModal } from '../modals/products'
import { ProductsTable } from '../tables/products-list'
import { IPartialPurchaseResponse } from '../../../interfaces/api-response/purchasePartialResponse'
import { PurchasesTable } from '../tables/purchashes-list'

type IFormEditUser = {
  id: string
  userRegister: IUpdateUser
  getUser: IGetUser
}

export function FormEditUser({ id, userRegister, getUser }: IFormEditUser) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [defaultValue, setDefaultValue] = useState({})

  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')

  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false)
  const [grantedProducts, setGrantedProducts] = useState<IPartialProductResponse[]>([])

  const [purchases, setPurchases] = useState<IPartialPurchaseResponse[]>([
    {
      date: '2022-06-22',
      transactionId: '123456',
      totalPrice: 1200,
      status: 'Pago'
    }
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
        name: Yup.string().required('Nome é Nescessário'),
        email: Yup.string().email('Insira um email válido.').required('Email é nescessário'),
        birthDate: Yup.string().required('Data de nascimento é nescessária'),
        cpf: Yup.string().required('CPF é nescessário'),
        phoneNumber: Yup.string().required('Telefone é nescessário'),
        level: Yup.string().required('Nível de conhecimento é nescessário'),
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
      cpf: cpf,
      photo: data.photo,
      birthDate: formatDateToUTC(data.birthDate).toISOString().split('T')[0],
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
      toast.success('Usuário editado com sucesso!')
    } catch (err: any) {
      toast.error(Array.isArray(err.messages) ? err.messages[0] : err.messages)
    }
  }

  function setKeys(obj: any) {
    Object.keys(obj).forEach((key) => {
      formRef.current?.setFieldValue(key, obj[key])
    })
    formRef.current?.setErrors({})
  }

  useEffect(() => {
    if (!formRef.current) return
    getUser
      .getOne()
      .then((res) => {
        const newData: any = {
          name: res.name,
          email: res.email,
          birthDate: formatDateToUTC(res.birthDate),
          cpf: res.cpf,
          phoneNumber: res.phoneNumber,
          level: res.level,
          role: res.role,
          zipCode: res.address[0]?.zipCode || '',
          street: res.address[0]?.street || '',
          neighborhood: res.address[0]?.neighborhood || '',
          city: res.address[0]?.city || '',
          state: res.address[0]?.state || '',
          number: res.address[0]?.number || '',
          complement: res.address[0]?.complement || '',
        }
        setKeys(newData)
      })
      .catch((err) => toast.error(err.messages))
  }, [])

  useEffect(() => {
    setKeys(defaultValue)
  }, [defaultValue])

  return (
    <>
      <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
        <div className='d-flex flex-row gap-5 w-100'>
          <div className='w-100'>
            <h3 className='mb-5'>Dados Pessoais</h3>

            <Input name='name' label='Nome' />
            <Input name='email' label='Email' type='email' />
            <DatePicker name='birthDate' label='Data de Nascimento' maxDate={new Date()} />
            <InputMasked name='cpf' label='CPF' mask='999.999.999-99' />
            <InputMasked name='phoneNumber' label='Telefone' mask='(99) 9 9999-9999' />

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
              onChange={async () => {
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

        <div className='d-flex justify-content-between gap-5'>
          <div className='w-50'>
            <h4 className='mb-5'>Acessos Concedidos</h4>
            <ProductsTable products={grantedProducts} setProducts={setGrantedProducts} />
          </div>

          <div className='w-50'>
            <h4 className='mb-5'>Compras Realizadas</h4>
            <PurchasesTable purchases={purchases} />
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

        <div className='mb-10 d-flex justify-content-between'>
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

      <ProductsModal
        isOpen={isProductsModalOpen}
        modalTitle='Adicionar produto grátis'
        action={handleOpenModal}
        onRequestClose={() => {
          setIsProductsModalOpen(false)
        }}
        onAddProduct={setGrantedProducts}
      />
    </>
  )
}
