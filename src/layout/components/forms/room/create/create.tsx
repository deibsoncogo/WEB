import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input, TextArea } from '../../../inputs'
import { SelectAsync } from '../../../inputs/selectAsync'
import { IGetCategories } from '../../../../../domain/usecases/interfaces/category/getCategories'
import { IGetAllUsers } from '../../../../../domain/usecases/interfaces/user/getAllUsers'
import { ISelectOption } from '../../../../../domain/shared/interface/SelectOption'
import { toast } from 'react-toastify'
import { appRoutes } from '../../../../../application/routing/routes'
import { CreateRoom } from '../../../../../domain/models/createRoom'
import { ICreateRoom } from '../../../../../domain/usecases/interfaces/room/createRoom'
import { InputNumber } from '../../../inputs/input-number'
import RoomInternalTable from './roomInternalTable'
import { getAsyncTeachersToSelectInput } from '../../../../templates/trainings/utils/getAsyncTeachersToSelectInput'
import { getAsyncCategoiesToSelectInput } from '../../../../templates/trainings/utils/getAsyncCategoriesToSelectInput'
import {
  IGetZoomUsers,
  IZoomUser,
} from '../../../../../domain/usecases/interfaces/zoom/getZoomUsers'
import { InputCheckbox } from '../../../inputs/input-checkbox'
import { ErrorMandatoryItem } from '../../../errors/errorMandatoryItem'
import { IStreamingRoom } from '../../../../../domain/models/streamingRoom'
import { currencyInputFormmater } from '../../../../formatters/currencyInputFormatter'
import { InputSingleImage } from '../../../inputs/input-single-image'
import { Button } from '../../../buttons/CustomButton'

type Props = {
  createRoom: ICreateRoom
  getCategories: IGetCategories
  getUsers: IGetAllUsers
  getZoomUsers: IGetZoomUsers
}

export function FormCreateRoom({ createRoom, getCategories, getUsers, getZoomUsers }: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [registerRoom, setRegisterRoom] = useState(false)
  const [isToShowStreaming, setIsToShowStreaming] = useState(false)
  const [streamingRoom] = useState<IStreamingRoom[]>([])
  const [hasErrorRoom, setHasErrorRoom] = useState(false)

  const [errorMessage, setMessageError] = useState('')

  const [zoomUsersOptions, setZoomUsersOptions] = useState<ISelectOption[]>([])
  const [defaultCategoryOptions, setDefaultCategoryOptions] = useState<ISelectOption[]>([])
  const [defaultTeacherOptions, setDefaultTeacherOptions] = useState<ISelectOption[]>([])

  async function verifyErrorStreamingRoom(data: IFormRoom) {
    if (!data.itemChat && !data.itemRoom)
      setMessageError('Você precisa adicionar, no mínimo, um dos itens')
    else if ((!data.itemChat || data.itemChat) && data.itemRoom && streamingRoom.length == 0)
      setMessageError('Você precisa adicionar, no mínimo, uma transmissão')
    else {
      return false
    }
    return true
  }

  const currencyFormatter = (name: string) => {
    var value = formRef.current?.getFieldValue(name)
    value = currencyInputFormmater(value)
    formRef.current?.setFieldValue(name, value)
    if (value == 'NaN') formRef.current?.setFieldValue(name, '')
  }

  async function handleFormSubmit(data: IFormRoom) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        imagePreview: Yup.string().required('Imagem é necessária'),
        name: Yup.string().required('Nome é necessário'),
        userId: Yup.string().required('Selecione um professor'),
        price: Yup.string().required('Preço é necessário'),
        installments: Yup.number()
          .min(1, 'Quantidade de parcelas deve ser maior maior que zero')
          .typeError('Quantidade de parcelas deve ser um número')
          .required('Quantidade de parcelas é necessário'),
        description: Yup.string().required('Descriçao é necessária'),
        categoryId: Yup.string().required('Selecione uma categoria'),
      })

      const hasError = await verifyErrorStreamingRoom(data)
      await schema.validate(data, { abortEarly: false })
      hasError ? setHasErrorRoom(hasError) : handleCreateRoom(data)
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
  async function handleCreateRoom(data: IFormRoom) {
    const price = data.price.replace('.', '').replace(',', '.')
    const discount = data.discount.replace('.', '').replace(',', '.')
    const room = new CreateRoom(
      data.name,
      data.description,
      discount,
      data.installments,
      false,
      data.itemChat,
      data.itemRoom,
      price,
      data.userId,
      data.categoryId,
      data.itemRoom ? streamingRoom : undefined
    )

    const formData = new FormData()

    if (data?.image) formData.append('image', data.image)
    formData.append('room', JSON.stringify(room))
    setRegisterRoom(true)
    createRoom
      .create(formData)
      .then(() => {
        toast.success('Sala criada com sucesso!')
        router.push(appRoutes.ROOMS)
      })
      .catch(() => toast.error('Não foi possível criar sala!'))
      .finally(() => setRegisterRoom(false))
  }

  const searchTeachers = async (teacherName: string) => {
    return getAsyncTeachersToSelectInput({ teacherName, remoteGetTeachers: getUsers })
  }

  const searchCategories = async (categoryName: string) => {
    return getAsyncCategoiesToSelectInput({
      categoryName,
      remoteGetCategories: getCategories,
    })
  }

  async function fetchData() {
    try {
      setDefaultTeacherOptions(await searchTeachers(''))
      setDefaultCategoryOptions(await searchCategories(''))

      const zoomUsers: IZoomUser[] = await getZoomUsers.get()
      if (zoomUsers) {
        const options: ISelectOption[] = zoomUsers.map((user) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: user.id,
        }))
        setZoomUsersOptions(options)
      }
    } catch (error) {
      toast.error('Não foi possível carregar os dados')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
        <h3 className='mb-5 text-muted'>Informações da Sala</h3>
        <InputSingleImage name='image' />
        <div className='d-flex flex-row gap-5 w-100'>
          <div className='w-50'>
            <Input name='name' label='Nome' />
            <SelectAsync
              searchOptions={searchTeachers}
              name='userId'
              label='Professor'
              classes='h-75px'
              placeholder='Digite o nome do professor'
              defaultOptions={defaultTeacherOptions}
            />
            <Input
              name='price'
              label='Preço'
              type='text'
              placeholderText='R$ 0,00'
              onChange={() => currencyFormatter('price')}
            />
            <Input
              name='discount'
              label='Desconto'
              type='text'
              placeholderText='R$ 0,00'
              onChange={() => currencyFormatter('discount')}
            />
            <InputNumber name='installments' label='Quantidade de Parcelas' />
          </div>
          <div className='w-50'>
            <TextArea
              name='description'
              label='Descrição'
              style={{ minHeight: '238px', margin: 0 }}
            />
            <SelectAsync
              searchOptions={searchCategories}
              name='categoryId'
              label='Categoria'
              classes='h-75px'
              placeholder='Digite o nome da categoria'
              defaultOptions={defaultCategoryOptions}
            />
          </div>
        </div>

        <h3 className='fs-6 fw-bolder text-dark'>Itens</h3>
        {hasErrorRoom && (
          <ErrorMandatoryItem
            mainMessage='Não é possível criar Sala!'
            secondaryMessage={errorMessage}
            setHasError={setHasErrorRoom}
          />
        )}

        <InputCheckbox name='itemChat' label='Chat' />
        <InputCheckbox
          name='itemRoom'
          label='Transmissão ao vivo'
          setIsToShowStreaming={setIsToShowStreaming}
        />

        {isToShowStreaming && (
          <div>
            <h3 className='mb-5 mt-5 text-muted'>Datas da Transmissão</h3>
            <RoomInternalTable
              formRef={formRef}
              streamingRoomArray={streamingRoom}
              zoomUsersOptions={zoomUsersOptions}
            />
          </div>
        )}

        <div className='d-flex mt-10'>
          <Button
            customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
            title='Cancelar'
            type='button'
            onClick={() => {
              router.push(appRoutes.ROOMS)
            }}
          />
          <Button
            type='submit'
            customClasses={['px-20', 'btn-primary']}
            title='Salvar'
            disabled={registerRoom}
          />
        </div>
      </Form>
    </>
  )
}
