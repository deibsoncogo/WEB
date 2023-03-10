import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { toast } from 'react-toastify'
import { appRoutes } from '../../../../application/routing/routes'
import { UnexpectedError } from '../../../../domain/errors/unexpected-error'
import { Address } from '../../../../domain/models/address'
import { GrantedProduct } from '../../../../domain/models/grantedProduct'
import { UserSignUp } from '../../../../domain/models/userSignUp'
import { IGetAllProducts } from '../../../../domain/usecases/interfaces/product/getAllProducts'
import { IUserSignUp } from '../../../../domain/usecases/interfaces/user/userSignUp'
import { validateIfCPFIsValid, validateStringWithNumber } from '../../../../helpers'
import { findCEP, ZipCodeProps } from '../../../../utils/findCEP'
import { restrictNumberInput } from '../../../../utils/restrictNumberInput'
import { levelOptions, roleOptions, stateOptions } from '../../../../utils/selectOptions'
import { Button } from '../../buttons/CustomButton'
import { DatePicker, Input, InputMasked, Select } from '../../inputs'
import { ProductsModal } from '../../modals/products'
import { ProductsTable } from '../../tables/products-list'
import { isStrongPassword } from '../../../../domain/shared/reggexPatterns/isPasswordStrong'
import { getStateNameByUF } from '../../../../utils/getStateNameByUF'

type Props = {
  userRegister: IUserSignUp
  verifyEmail: IUserVerifyEmail
  isCPFAlreadyRegistered: IUserVerifyCPF
  getProducts: IGetAllProducts
}

export function FormCreateUser({
  userRegister,
  verifyEmail,
  isCPFAlreadyRegistered,
  getProducts,
}: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [defaultValue, setDefaultValue] = useState<ZipCodeProps>()

  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false)
  const [registerUser, setRegisterUser] = useState(false)

  const [grantedProducts, setGrantedProducts] = useState<GrantedProduct[]>([])

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
        password: Yup.string()
          .min(8)
          .matches(
            isStrongPassword,
            'A senha deve ter no m??nimo 8 caracteres e conter no m??nimo 1 letra mai??scula, 1 letra min??scula, 1 n??mero e 1 caractere especial'
          ),
        role: Yup.string().required('Permiss??o ?? necess??ria'),
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

  async function emailIsAlreadyRegistered(email: string) {
    try {
      await verifyEmail.verifyUserEmail(email)
      return false
    } catch (err: any) {
      if (!formRef.current) return
      formRef.current.setFieldError('email', 'Email j?? registrado')
      return true
    }
  }

  function formatDataToSend(data: any) {
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

    const grantedProduct = grantedProducts.map((product) => {
      return new GrantedProduct(product.productId, product.expireDate, product.product)
    })

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
      address,
      grantedProduct
    )

    return user
  }

  async function createUserRequest(data: any) {
    try {
      await userRegister.signUp(data)
      router.push(appRoutes.USERS)
      toast.success('Usu??rio cadastrado com sucesso!')
    } catch (error: any) {
      if (error instanceof UnexpectedError) {
        toast.error('Erro Inesperado. N??o foi poss??vel cadastrar o usu??rio!')
      }
    } finally {
      setRegisterUser(false)
    }
  }

  async function handleCreateUser(data: any) {
    setRegisterUser(true)
    const hasEmailRegistered = await emailIsAlreadyRegistered(data.email)
    const hasCPFRegistered = data?.cpf
      ? await isCPFAlreadyRegistered.verifyUserCPF(data.cpf)
      : false

    if (!hasEmailRegistered && !hasCPFRegistered) {
      await createUserRequest(data)
    } else if (hasCPFRegistered) {
      formRef?.current?.setFieldError('cpf', 'CPF j?? registrado')
    }
    setRegisterUser(false)
  }

  function handleInputCPF() {
    if (!formRef.current) return
    const cpf = formRef.current?.getData().cpf
    const matches = cpf?.match(/\d*/g)
    const number = matches?.join('')

    if (number?.length !== 11) return

    const result = validateIfCPFIsValid(formRef.current?.getData().cpf)
    if (!result) formRef.current.setFieldError('cpf', 'CPF inv??lido')
  }

  async function handleInputZipCode() {
    const zipCode = formRef.current?.getData().zipCode
    const result = await findCEP(zipCode)
    const stateName = getStateNameByUF(stateOptions, result?.state as string)
    formRef.current?.setFieldValue('state-label', stateName);
    setDefaultValue(result)
  }

  const dateBase = new Date()

  return (
    <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5'>Dados Pessoais</h3>

          <Input classes='h-75px' name='name' label='Nome' type='text' />
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
            type='text'
            mask='(99) 9 9999-9999'
          />

          <Select
            classes='h-75px'
            name='level'
            label='N??vel de Conhecimento'
            options={levelOptions}
          />
          <Input classes='h-75px' name='password' label='Senha' type='password' />

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
          <Input
            classes='h-75px'
            name='number'
            label='N??mero'
            type='number'
            onKeyDown={restrictNumberInput}
            min='0'
          />
          <Input classes='h-75px' name='complement' label='Complemento' />
          <Input classes='h-75px' name='neighborhood' label='Bairro' />
          <Input classes='h-75px' name='city' label='Cidade' />

          <Select classes='h-75px' name='state' label='Estado' options={stateOptions} />
        </div>
      </div>

      {grantedProducts && (
        <div className='w-50'>
          <h4 className='mb-5'>Acessos concedidos</h4>
          <ProductsTable
            grantedProducts={grantedProducts}
            setGrantedProducts={setGrantedProducts}
          />
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
          Adicionar produto gr??tis
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
          loading={registerUser}
          disabled={registerUser}
        />
      </div>

      <ProductsModal
        isOpen={isProductsModalOpen}
        modalTitle='Adicionar produto gr??tis'
        action={handleOpenModal}
        onRequestClose={() => {
          setIsProductsModalOpen(false)
        }}
        grantedProducts={grantedProducts}
        onAddProduct={setGrantedProducts}
        getProducts={getProducts}
      />
    </Form>
  )
}
