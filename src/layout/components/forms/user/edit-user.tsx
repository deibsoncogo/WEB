import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { UnexpectedError } from '../../../../domain/errors/unexpected-error'
import { GrantedProduct } from '../../../../domain/models/grantedProduct'
import { ITransaction } from '../../../../domain/models/transaction'
import { IGetAllProducts } from '../../../../domain/usecases/interfaces/product/getAllProducts'
import { IGetAllUserTransactions } from '../../../../domain/usecases/interfaces/transactions/getAllUserTransactions'
import { IGetUser } from '../../../../domain/usecases/interfaces/user/getUser'
import { IUpdateUser } from '../../../../domain/usecases/interfaces/user/updateUser'
import { formatDateToUTC, validateIfCPFIsValid, validateStringWithNumber } from '../../../../helpers'
import { findCEP, ZipCodeProps } from '../../../../utils/findCEP'
import { getStateNameByUF } from '../../../../utils/getStateNameByUF'
import { levelOptions, roleOptions, stateOptions } from '../../../../utils/selectOptions'
import { Button } from '../../buttons/CustomButton'
import { DatePicker, Input, InputMasked, Select } from '../../inputs'
import { ProductsModal } from '../../modals/products'
import { ProductsTable } from '../../tables/products-list'
import { PurchasesTable } from '../../tables/purchashes-list'

type IFormEditUser = {
  id: string
  userRegister: IUpdateUser
  getUser: IGetUser
  getProducts: IGetAllProducts
  isCPFAlreadyRegistered: IUserVerifyCPF
  remoteGetAllUserTransactions: IGetAllUserTransactions
  verifyEmail: IUserVerifyEmail
}

export function FormEditUser({
  id, userRegister, getUser, isCPFAlreadyRegistered, getProducts, remoteGetAllUserTransactions, verifyEmail,
}: IFormEditUser) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [updateUser, setUpdateUser] = useState(false)
  const [defaultValue, setDefaultValue] = useState<ZipCodeProps>()
  const [email, setEmail] = useState<string>('')
  const [cpf, setCPF] = useState<string>('')
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false)
  const [grantedProducts, setGrantedProducts] = useState<GrantedProduct[]>([])
  const [purchases, setPurchases] = useState<ITransaction[]>([])

  async function handleOpenModal() {
    try {
      setIsProductsModalOpen(false)
      toast.success('Produtos adicionados com sucesso!')
    } catch (err: any) {
      toast.error(err.messages[0] + '!')
    }
  }

  async function handleFormSubmit(data: IFormCreateUser) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string()
          .test('no number', 'O campo n??o deve conter n??meros', validateStringWithNumber)
          .required('Nome ?? necess??rio'),
        email: Yup.string().email('Insira um e-mail v??lido.').required('E-mail ?? necess??rio'),
        cpf: Yup.string().test({
          name: 'is valid',
          message: 'CPF inv??lido',
          test: (value) => (value ? validateIfCPFIsValid(value) : true),
        }),
        role: Yup.string().required('Permiss??o ?? necess??ria'),
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
      toast.success('Usu??rio editado com sucesso!')
    } catch (error: any) {
      if (error instanceof UnexpectedError) {
        toast.error('Erro Inesperado. N??o foi poss??vel atualizar o usu??rio!')
      }
    } finally {
      setUpdateUser(false)
    }
  }

  async function handleUpdateUser(data: any) {
    setUpdateUser(true)

    if (data.email !== email) {
      const hasEmailRegistered = await emailIsAlreadyRegistered(data.email)
      if (hasEmailRegistered)
        formRef?.current?.setFieldError('email', 'E-mail j?? registrado')
    } else {
      delete data.email
    }

    if (data.cpf !== cpf) {
      const hasCPFRegistered = await isCPFAlreadyRegistered.verifyUserCPF(data.cpf)
      if (hasCPFRegistered)
        formRef?.current?.setFieldError('cpf', 'CPF j?? registrado')
    } else {
      delete data.cpf
    }

    await updateUserRequest(data)

    setUpdateUser(false)
  }

  async function emailIsAlreadyRegistered(email: string) {
    try {
      await verifyEmail.verifyUserEmail(email)
      return false
    } catch (err: any) {
      return true
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
        setEmail(newData.email)
        setCPF(newData.cpf)

        formRef.current?.setFieldValue('name', newData.name)
        formRef.current?.setFieldValue('email', newData.email)
        formRef.current?.setFieldValue('birthDate', newData.birthDate)
        formRef.current?.setFieldValue('cpf', newData.cpf)
        formRef.current?.setFieldValue('phoneNumber', newData.phoneNumber)
        formRef.current?.setFieldValue('level', newData.level)
        formRef.current?.setFieldValue(
          'level-label',
          levelOptions.find((lvl) => lvl.value === newData.level)?.label
        )
        formRef.current?.setFieldValue('role', newData.role)
        formRef.current?.setFieldValue(
          'role-label',
          roleOptions.find((role) => role.value === newData.role)?.label
        )
        formRef.current?.setFieldValue('zipCode', newData.zipCode)
        formRef.current?.setFieldValue('street', newData.street)
        formRef.current?.setFieldValue('neighborhood', newData.neighborhood)
        formRef.current?.setFieldValue('city', newData.city)
        formRef.current?.setFieldValue('number', newData.number)
        formRef.current?.setFieldValue('complement', newData.complement)
        formRef.current?.setFieldValue('state', newData.state)
        formRef.current?.setFieldValue(
          'state-label',
          stateOptions.find((state) => state.value === newData.state)?.label
        )
      })
      .catch((err) => toast.error(err.messages) + '!')
  }, [])

  useEffect(() => {
    remoteGetAllUserTransactions
      .getAll(id)
      .then((response) => {
        setPurchases(response)
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
    const stateName = getStateNameByUF(stateOptions, result?.state as string)
    formRef.current?.setFieldValue('state-label', stateName);
    if (result) inputAddress(result)
  }

  function handleInputCPF() {
    if (!formRef.current) return
    const inputCpf = formRef.current?.getData().cpf
    const matches = inputCpf?.match(/\d*/g)
    const number = matches?.join('')

    if (number?.length !== 11) return

    const result = validateIfCPFIsValid(formRef.current?.getData().cpf)
    if (!result) formRef.current.setFieldError('cpf', 'CPF inv??lido')
  }

  const dateBase = new Date()

  return (
    <>
      <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
        <div className='d-flex flex-row gap-5 w-100'>
          <div className='w-100'>
            <h3 className='mb-5'>Dados Pessoais</h3>

            <Input classes='h-75px' name='name' label='Nome' />

            <Input classes='h-75px' name='email' label='E-mail' type='email' />

            <DatePicker
              classes='h-75px'
              name='birthDate'
              label='Data de Nascimento'
              maxDate={new Date(dateBase.getFullYear() - 18, dateBase.getMonth(), dateBase.getDate())}
              maxYearAmount={-17}
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
              mask='(99) 9 9999-9999'
            />

            <Select
              classes='h-75px'
              name='level'
              label='N??vel de Conhecimento'
              options={levelOptions}
            />

            <Select classes='h-75px' name='role' label='Permiss??o' options={roleOptions} />
          </div>

          <div className='w-100'>
            <h3 className='mb-5'>Endere??o</h3>

            <InputMasked
              classes='h-75px'
              name='zipCode'
              label='CEP'
              mask='99999-999'
              onChange={handleInputZipCode}
            />

            <Input classes='h-75px' name='street' label='Logradouro' />

            <Input classes='h-75px' name='number' label='N??mero' type='number' />

            <Input classes='h-75px' name='complement' label='Complemento' />

            <Input classes='h-75px' name='neighborhood' label='Bairro' />

            <Input classes='h-75px' name='city' label='Cidade' />

            <Select classes='h-75px' name='state' label='Estado' options={stateOptions} />
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
            onClick={() => { setIsProductsModalOpen(true) }}
          >
            Adicionar produto gr??tis
          </button>
        </div>

        <div className='d-flex mt-10'>
          <Button
            title='Cancelar'
            type='button'
            customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
            onClick={() => { router.push('/users') }}
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
        modalTitle='Adicionar Produto Gr??tis'
        action={handleOpenModal}
        onRequestClose={() => { setIsProductsModalOpen(false) }}
        grantedProducts={grantedProducts}
        onAddProduct={setGrantedProducts}
        getProducts={getProducts}
      />
    </>
  )
}
