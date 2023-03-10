import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { appRoutes } from '../../../../../application/routing/routes'
import { CreateRoom } from '../../../../../domain/models/createRoom'
import { IStreamingRoom } from '../../../../../domain/models/streamingRoom'
import { ISelectOption } from '../../../../../domain/shared/interface/SelectOption'
import { ICreateRoom } from '../../../../../domain/usecases/interfaces/room/createRoom'
import { IGetAllUsers } from '../../../../../domain/usecases/interfaces/user/getAllUsers'
import { IGetZoomUsers, IZoomUser } from '../../../../../domain/usecases/interfaces/zoom/getZoomUsers'
import { getZoomUserName } from '../../../../../utils/getZoomUserName'
import { onlyNums } from '../../../../formatters/currenceFormatter'
import { getAsyncTeachersToSelectInput } from '../../../../templates/trainings/utils/getAsyncTeachersToSelectInput'
import { Button } from '../../../buttons/CustomButton'
import { ErrorMandatoryItem } from '../../../errors/errorMandatoryItem'
import { Input, InputCurrence, TextArea } from '../../../inputs'
import { InputCheckbox } from '../../../inputs/input-checkbox'
import { InputNumber } from '../../../inputs/input-number'
import { InputSingleImage } from '../../../inputs/input-single-image'
import { SelectAsync } from '../../../inputs/selectAsync'
import RoomInternalTable from './roomInternalTable'

type Props = {
  createRoom: ICreateRoom
  getUsers: IGetAllUsers
  getZoomUsers: IGetZoomUsers
}

export function FormCreateRoom({ createRoom, getUsers, getZoomUsers }: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [registerRoom, setRegisterRoom] = useState(false)
  const [isToShowStreaming, setIsToShowStreaming] = useState(false)
  const [hasErrorRoom, setHasErrorRoom] = useState(false)
  const [errorMessage, setMessageError] = useState('')
  const [streamingRoom] = useState<IStreamingRoom[]>([])
  const [zoomUsersOptions, setZoomUsersOptions] = useState<ISelectOption[]>([])
  const [zoomUsersList, setZoomUsersList] = useState<IZoomUser[]>([])
  const [defaultTeacherOptions, setDefaultTeacherOptions] = useState<ISelectOption[]>([])

  async function verifyErrorStreamingRoom(data: IFormRoom) {
    if (!data.itemChat && !data.itemRoom)
      setMessageError('?? necess??rio selecionar pelo menos 1 dos itens')
    else if ((!data.itemChat || data.itemChat) && data.itemRoom && streamingRoom.length == 0)
      setMessageError('Voc?? precisa adicionar, no m??nimo, uma transmiss??o')
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
        imagePreview: Yup.string().required('Imagem ?? necess??ria'),
        name: Yup.string().required('Nome ?? necess??rio').max(50, 'No m??ximo 50 caracteres'),
        userId: Yup.string().required('Selecione um professor'),
        price: Yup.number().required('Pre??o ?? necess??rio').min(0.1, 'Pre??o deve ser maior que zero'),
        discount: Yup.number().test({
          name: 'validation',
          message: 'Desconto deve ser menor que pre??o',
          test: (value) =>
            value ? parseFloat(data.discount + '') < parseFloat(data.price + '') : true,
        }),
        installments: Yup.number()
          .min(1, 'Quantidade de parcelas deve ser maior que zero')
          .typeError('Quantidade de parcelas deve ser um n??mero')
          .required('Quantidade de parcelas ?? necess??rio'),
        description: Yup.string()
          .required('Descri????o ?? necess??ria')
          .max(65535, 'Descri????o muito longa'),
        level: Yup.string().required('N??vel ?? necess??rio').max(50, 'No m??ximo 50 caracteres'),
      })

      await schema.validate({ ...data, price: onlyNums(data.price) }, { abortEarly: false })
      const hasError = await verifyErrorStreamingRoom(data)
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
    const room = new CreateRoom(
      data.name,
      data.description,
      data.discount,
      data.installments,
      false,
      data.itemChat,
      data.itemRoom,
      data.price,
      data.userId,
      data.level,
      data.itemRoom ? data.zoomUserId : undefined,
      data.itemRoom ? data.zoomUserName = getZoomUserName(zoomUsersList, data.zoomUserId) : undefined,
      data.itemRoom ? streamingRoom : undefined
    )

    const formData = new FormData()

    if (data?.image) formData.append('image', data.image)
    formData.append('room', JSON.stringify(room))
    setRegisterRoom(true)
    createRoom
      .create(formData)
      .then(() => {
        toast.success('Sala cadastrada com sucesso!')
        router.push(appRoutes.ROOMS)
      })
      .catch(() => toast.error('N??o foi poss??vel criar sala!'))
      .finally(() => setRegisterRoom(false))
  }

  const searchTeachers = async (teacherName: string) => {
    return getAsyncTeachersToSelectInput({ teacherName, remoteGetTeachers: getUsers })
  }

  async function fetchData() {
    try {
      setDefaultTeacherOptions(await searchTeachers(''))

      const zoomUsers: IZoomUser[] = await getZoomUsers.get()

      if (zoomUsers) {
        const options: ISelectOption[] = zoomUsers.map((user) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: user.id,
        }))

        setZoomUsersList(zoomUsers)
        setZoomUsersOptions(options)
      }
    } catch (error) {
      toast.error('N??o foi poss??vel carregar os dados!')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
        <h3 className='mb-5 text-muted'>Informa????es da Sala</h3>
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
            <InputCurrence name='price' label='Pre??o' />
            <InputCurrence name='discount' label='Desconto' />
            <InputNumber name='installments' label='Quantidade de Parcelas' />
          </div>
          <div className='w-50'>
            <TextArea name='description' label='Descri????o' style={{ minHeight: '238px', margin: 0 }} />
            <Input name='level' label='N??vel' />
          </div>
        </div>

        <h3 className='fs-6 fw-bolder text-dark'>Itens</h3>
        {hasErrorRoom && (
          <div
            className='text-danger'
            style={{
              position: 'relative',
              top: '-8px',
            }}
          >
            ?? necess??rio selecionar pelo menos 1 dos itens
          </div>
        )}

        <InputCheckbox name='itemChat' label='Chat' />
        <InputCheckbox
          name='itemRoom'
          label='Transmiss??o ao vivo'
          setIsToShowStreaming={setIsToShowStreaming}
        />

        {isToShowStreaming && (
          <div>
            <h3 className='mb-5 mt-5 text-muted'>Datas da Transmiss??o</h3>
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
            disabled={registerRoom}
            onClick={() => {
              router.push(appRoutes.ROOMS)
            }}
          />
          <Button
            type='submit'
            customClasses={['px-20', 'btn-primary']}
            title='Salvar'
            disabled={registerRoom}
            loading={registerRoom}
          />
        </div>
      </Form>
    </>
  )
}
