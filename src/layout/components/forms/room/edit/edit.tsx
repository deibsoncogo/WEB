import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { appRoutes } from '../../../../../application/routing/routes'
import { IStreamingRoom } from '../../../../../domain/models/streamingRoom'
import { UpdateRoom } from '../../../../../domain/models/updateRoom'
import { ISelectOption } from '../../../../../domain/shared/interface/SelectOption'
import { IGetRoom } from '../../../../../domain/usecases/interfaces/room/getCourse'
import { IUpdateRoom } from '../../../../../domain/usecases/interfaces/room/updateRoom'
import { IGetAllUsers } from '../../../../../domain/usecases/interfaces/user/getAllUsers'
import { IGetZoomUsers } from '../../../../../domain/usecases/interfaces/zoom/getZoomUsers'
import { startStreamingRoomHelper } from '../../../../../helpers/startStreamingRoomHelper'
import { maskedToMoney, onlyNums } from '../../../../formatters/currenceFormatter'
import { getAsyncTeachersToSelectInput } from '../../../../templates/trainings/utils/getAsyncTeachersToSelectInput'
import { Button } from '../../../buttons/CustomButton'
import { ErrorMandatoryItem } from '../../../errors/errorMandatoryItem'
import { FullLoading } from '../../../FullLoading/FullLoading'
import { Input, InputCurrence, TextArea } from '../../../inputs'
import { InputCheckbox } from '../../../inputs/input-checkbox'
import { InputNumber } from '../../../inputs/input-number'
import { InputSingleImage } from '../../../inputs/input-single-image'
import { SelectAsync } from '../../../inputs/selectAsync'
import RoomInternalTable from './roomInternalTable'

type Props = {
  id: string | string[] | undefined
  getRoom: IGetRoom
  updateRoom: IUpdateRoom
  getUsers: IGetAllUsers
  getZoomUsers: IGetZoomUsers
}

export function FormUpdateRoom({
  id,
  getRoom,
  updateRoom,
  getUsers,
  getZoomUsers,
}: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(true)
  const [update, setUpdate] = useState(false)

  const [isToShowStreaming, setIsToShowStreaming] = useState(false)
  const [streamingRoom, setStreamingRoom] = useState<IStreamingRoom[]>([])
  const [hasErrorRoom, setHasErrorRoom] = useState(false)

  const [errorMessage, setMessageError] = useState('')

  const [zoomUsersOptions, setZoomUsersOptions] = useState<ISelectOption[]>([])
  const [defaultTeacherOptions, setDefaultTeacherOptions] = useState<ISelectOption[]>([])
  const [zoomUserId, setZoomUserId] = useState<string | null>(null)

  const [idDeletedStreamingRoom] = useState<string[]>([])
  const [streamRoomUpdate] = useState<IStreamingRoom[]>([])

  const searchTeachers = async (teacherName: string) => {
    return getAsyncTeachersToSelectInput({ teacherName, remoteGetTeachers: getUsers })
  }

  async function verifyErrorStreamingRoom(data: IFormRoom) {
    if (!data.itemChat && !data.itemRoom)
      setMessageError('É necessário selecionar pelo menos 1 dos itens')
    else if ((!data.itemChat || data.itemChat) && data.itemRoom && streamingRoom.length == 0)
      setMessageError('Você precisa adicionar, no mínimo, uma transmissão')
    else {
      return false
    }
    return true
  }

  async function handleFormSubmit(data: IFormRoom) {
    if (!formRef.current) throw new Error()
    try {
      formRef.current.setErrors({})
      data.price = onlyNums(data.price)
      data.discount = onlyNums(data?.discount)
      const schema = Yup.object().shape({
        imagePreview: Yup.string().required('Imagem é necessária'),
        name: Yup.string().required('Nome é necessário').max(50, 'No máximo 50 caracteres'),
        userId: Yup.string().required('Selecione um professor'),
        price: Yup.number()
          .required('Preço é necessário')
          .min(0.1, 'Preço deve ser maior que zero'),
        discount: Yup.number().test({
          name: 'validation',
          message: 'Desconto deve ser menor que preço',
          test: (value) =>
            value ? parseFloat(data.discount + '') < parseFloat(data.price + '') : true,
        }),
        installments: Yup.number()
          .typeError('Quantidade de parcelas deve ser um número')
          .required('Quantidade de parcelas é necessário')
          .positive('Quantidade de parcelas deve ser positiva'),
        description: Yup.string()
          .required('Descrição é necessária')
          .max(65535, 'Descrição muito longa'),
        level: Yup.string().required('Nível é necessário').max(50, 'No máximo 50 caracteres'),
      })

      const hasError = await verifyErrorStreamingRoom(data)
      hasError ? setHasErrorRoom(hasError) : handleUpdateRoom(data)
      await schema.validate({ ...data, price: onlyNums(data.price) }, { abortEarly: false })
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
  async function handleUpdateRoom(data: IFormRoom) {
    const room = new UpdateRoom(
      typeof id === 'string' ? id : undefined,
      data.name,
      data.description,
      data.discount,
      data.installments,
      data.isActive,
      data.itemChat,
      data.itemRoom,
      data.price,
      data.userId,
      data.level,
      data.zoomUserId,
      streamRoomUpdate
    )

    const formData = new FormData()
    if (data?.image) {
      formData.append('image', data.image)
    }
    if (idDeletedStreamingRoom.length > 0) {
      idDeletedStreamingRoom.forEach((idRoom) => {
        formData.append('deleteStreamingRooms', idRoom)
      })
    }
    formData.append('room', JSON.stringify(room))

    setUpdate(true)
    updateRoom
      .update(formData)
      .then(() => {
        toast.success('Sala editada com sucesso!')
        router.push(appRoutes.ROOMS)
      })
      .catch(() => toast.error('Não foi possível atualizar sala!'))
      .finally(() => setUpdate(false))
  }

  useEffect(() => {
    if (typeof id == 'string') {
      getRoom.get(id).then((data) => {
        formRef.current?.setFieldValue('name', data.name)
        formRef.current?.setFieldValue('description', data.description)
        formRef.current?.setFieldValue('userId', data.userId)
        formRef.current?.setFieldValue('userId-label', data.teacherName)
        formRef.current?.setFieldValue('level', data.level)
        formRef.current?.setFieldValue('price', maskedToMoney(data.price))
        formRef.current?.setFieldValue('discount', maskedToMoney(data.discount))
        formRef.current?.setFieldValue('imagePreview', data.imageUrl)
        formRef.current?.setFieldValue('installments', data.installments)
        formRef.current?.setFieldValue('zoomUserId', data.zoomUserId)
        formRef.current?.setFieldValue('isActive', data.isActive)

        let inputRefChat = formRef.current?.getFieldRef('itemChat')
        inputRefChat.current.checked = data.isChatActive
        inputRefChat.current.value = data.isChatActive
        let inputRefRoom = formRef.current?.getFieldRef('itemRoom')
        inputRefRoom.current.checked = data.isStreamingRoomActive
        inputRefRoom.current.value = data.isStreamingRoomActive
        setIsToShowStreaming(data.isStreamingRoomActive)
        setStreamingRoom(startStreamingRoomHelper(data?.streamingRooms))
        getZoomUsers
          .get()
          .then((zoomListUsers) => {
            if (zoomListUsers) {
              const options: ISelectOption[] = zoomListUsers.map((user) => ({
                label: `${user.first_name} ${user.last_name}`,
                value: user.id,
              }))
              setZoomUsersOptions(options)
            }
          })
          .finally(() => {
            setZoomUserId(data.zoomUserId)

            setLoading(false)
          })
      })
    }

    searchTeachers('').then((dataTeachers) => {
      setDefaultTeacherOptions(dataTeachers)
    })
  }, [])

  useEffect(() => {
    if (zoomUserId) {
      formRef.current?.setFieldValue('zoomUserId', zoomUserId)
    }
  }, [zoomUserId, zoomUsersOptions])

  return (
    <>
      {loading && <FullLoading />}
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
            <InputCurrence name='price' label='Preço' />
            <InputCurrence name='discount' label='Desconto' />

            <InputNumber name='installments' label='Quantidade de Parcelas' />
          </div>
          <div className='w-50'>
            <TextArea name='description' label='Descrição' style={{ minHeight: '246px', margin: 0 }} />
            <Input name='level' label='Nível' />
          </div>
        </div>

        <h3 className='fs-6 fw-bolder text-dark'>Itens</h3>
        {hasErrorRoom && (
          <ErrorMandatoryItem
            mainMessage='Não é possível atualizar Sala!'
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
              idDeletedStreamingRoom={idDeletedStreamingRoom}
              streamRoomUpdate={streamRoomUpdate}
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
            disabled={update}
            loading={update}
          />
        </div>
      </Form>
    </>
  )
}
