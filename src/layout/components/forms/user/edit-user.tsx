import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { toast } from 'react-toastify'
import { FormHandles } from '@unform/core'

import { findCEP, ZipCodeProps } from '../../../../utils/findCEP'
import {
  formatDateToUTC,
  validateIfCPFIsValid,
  validateStringWithNumber,
} from '../../../../helpers'
import { levelOptions, roleOptions, stateOptions } from '../../../../utils/selectOptions'

import { DatePicker, Input, InputMasked, Select } from '../../inputs'

import { IGetUser } from '../../../../domain/usecases/interfaces/user/getUser'
import { IUpdateUser } from '../../../../domain/usecases/interfaces/user/updateUser'
import { IPartialProductResponse } from '../../../../interfaces/api-response/productsPartialResponse'
import { ProductsModal } from '../../modals/products'
import { ProductsTable } from '../../tables/products-list'
import { Button } from '../../buttons/CustomButton'
import { UnexpectedError } from '../../../../domain/errors/unexpected-error'

type IFormEditUser = {
  id: string
  userRegister: IUpdateUser
  getUser: IGetUser
  isCPFAlreadyRegistered: IUserVerifyCPF
}

export function FormEditUser({ id, userRegister, getUser, isCPFAlreadyRegistered}: IFormEditUser) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)


  const [updateUser, setUpdateUser] = useState(false)
 
  const [cpf, setCPF] = useState()

  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false)
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
        cpf: Yup.string().test({
          name: 'is valid',
          message: 'CPF inválido',
          test: (value) => (value ? validateIfCPFIsValid(value) : true),
        }),
        password: Yup.string().min(6, 'No mínimo 6 caracteres'),
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
    const cpf = matchesCPF?.join('')

    const matchesPhone = data.phoneNumber.match(/\d*/g)
    const phoneNumber = matchesPhone?.join('')

    const matchesCEP = data.zipCode.match(/\d*/g)
    const zipCode = matchesCEP?.join('')

    const userData = {
      id,
      name: data.name,
      email: data.email,
      cpf: cpf || null,
      birthDate: data?.birthDate
        ? formatDateToUTC(data.birthDate).toISOString().split('T')[0]
        : null,
      phoneNumber: phoneNumber || null,
      role: data.role,
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
    }
    finally{
      setUpdateUser(false)  
    }
  }


  async function handleUpdateUser(data: any) { 
    setUpdateUser(true)
    const hasAlreadyCPF = await isCPFAlreadyRegistered.verifyUserCPF(data?.cpf)  
  
    if(cpf || !hasAlreadyCPF){      
      updateUserRequest(data)    
    }    
    else {
      formRef?.current?.setFieldError('cpf', 'CPF já registrado') 
      setUpdateUser(false)  
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
   
        setCPF(newData.cpf)
        setKeys(newData)
      })
      .catch((err) => toast.error(err.messages))
  }, [])


  const stateName = async (result: ZipCodeProps | undefined) => {
    let state = ''
    stateOptions.forEach((element) => {
      if (element.value === result?.state) {
        state = element.label
      }
    })
    return state
  }
  async function handleInputZipCode() {
    const zipCode = formRef.current?.getData().zipCode
    const result = await findCEP(zipCode)
    formRef.current?.setFieldValue('city', result?.city)
    formRef.current?.setFieldValue('state', await stateName(result))
  }

  function handleInputCPF() {
    if (!formRef.current) return
    const cpf = formRef.current?.getData().cpf
    const matches = cpf?.match(/\d*/g)
    const number = matches?.join('')

    if (number?.length !== 11) return

    const result = validateIfCPFIsValid(formRef.current?.getData().cpf)
    if (!result) formRef.current.setFieldError('cpf', 'CPF inválido')
  }

  return (
    <>
      <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
        <div className='d-flex flex-row gap-5 w-100'>
          <div className='w-100'>
            <h3 className='mb-5'>Dados Pessoais</h3>

            <Input name='name' label='Nome' />
            <Input name='email' label='Email' type='email' disabled={true} />
            <DatePicker name='birthDate' label='Data de Nascimento' maxDate={new Date()} />
            <InputMasked
              classes='h-75px'
              name='cpf'
              label='CPF'
              type='text'
              mask='999.999.999-99'
              disabled={!!cpf}
              onChange={handleInputCPF}
            />
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
              classes='h-75px'
              name='zipCode'
              label='CEP'
              mask='99999-999'
              onChange={handleInputZipCode}
            />
            <Input name='street' label='Logradouro' />
            <Input name='number' label='Número' type='number' />
            <Input name='complement' label='Complemento' />
            <Input name='neighborhood' label='Bairro' />
            <Input name='city' label='Cidade' />
            <Input name='state' label='Estado' />
          
          </div>
        </div>

        {grantedProducts.length > 0 && (
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
