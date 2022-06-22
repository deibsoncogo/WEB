import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'


import { InputImage } from '../../../inputs/input-image'
import { Input, TextArea } from '../../../inputs'
import { SelectAsync } from '../../../inputs/selectAsync'
import { IGetCategories } from '../../../../../domain/usecases/interfaces/category/getCategories'
import { IGetAllUsers } from '../../../../../domain/usecases/interfaces/user/getAllUsers'
import { ISelectOption } from '../../../../../domain/shared/interface/SelectOption'
import { toast } from 'react-toastify'
import { appRoutes } from '../../../../../application/routing/routes'

import CustomButton from '../../../buttons/CustomButton'
import { IGetRoom } from '../../../../../domain/usecases/interfaces/room/getCourse'
import { IUpdateRoom } from '../../../../../domain/usecases/interfaces/room/updateRoom'
import { IRoomResponse } from '../../../../../interfaces/api-response/roomResponse'
import { IGetZoomUsers } from '../../../../../domain/usecases/interfaces/zoom/getZoomUsers'
import { currencyInputFormmater } from '../../../../formatters/currencyInputFormatter'
import { getAsyncTeachersToSelectInput } from '../../../../templates/trainings/utils/getAsyncTeachersToSelectInput'
import { getAsyncCategoiesToSelectInput } from '../../../../templates/trainings/utils/getAsyncCategoriesToSelectInput'
import { IStreamingRoom } from '../../../../../domain/models/streamingRoom'
import { ErrorMandatoryItem } from '../../../errors/errorMandatoryItem'
import { InputCheckbox } from '../../../inputs/input-checkbox'
import { UpdateRoom } from '../../../../../domain/models/updateRoom'
import { currenceMaskOnlyValue } from '../../../../formatters/currenceFormatter'
import { InputNumber } from '../../../inputs/input-number'
import {startStreamingRoomHelper} from '../../../../../helpers/startStreamingRoomHelper'

import { FullLoading } from '../../../FullLoading/FullLoading'
import RoomInternalTable from './roomInternalTable'

type Props = {
  id: string| string[] | undefined
  getRoom: IGetRoom
  updateRoom: IUpdateRoom  
  getCategories: IGetCategories
  getUsers: IGetAllUsers
  getZoomUsers: IGetZoomUsers
}

export function FormUpdateRoom({ id, getRoom, updateRoom, getCategories, getUsers, getZoomUsers}: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(true)
  const [update, setUpdate] = useState(false)
  const [defaultValue, setDefaultValue] = useState<IRoomResponse>()

  const [isToShowStreaming, setIsToShowStreaming] = useState(false)
  const [imageUpload, setImageUpload] = useState<File>()
  const [streamingRoom, setStreamingRoom] = useState<IStreamingRoom[]>([])
  const [hasErrorRoom, setHasErrorRoom] = useState(false)


  const [zoomUsersOptions, setZoomUsersOptions] = useState<ISelectOption[]>([])
  const [defaultCategoryOptions, setDefaultCategoryOptions] = useState<ISelectOption[]>([])
  const [defaultTeacherOptions, setDefaultTeacherOptions] = useState<ISelectOption[]>([])

  const [idDeletedStreamingRoom] = useState<string[]>([])
  const [streamRoomUpdate] = useState<IStreamingRoom[]>([])
  
  const handleSingleImageUpload = (file?: File) => {
    setImageUpload(file)
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
        name: Yup.string().required('Nome é necessário'),
        userId: Yup.string().required('Selecione um professor'),
        price: Yup.string().required('Preço é necessário'),
        installments: Yup.number()
          .typeError('Quantidade de parcelas deve ser um número')
          .required('Quantidade de parcelas é necessário')
          .positive('Quantidade de parcelas deve ser positiva')
          .integer('Quantidade de parcelas deve ser um número inteiro'),
        description: Yup.string().required('Descriçao é necessária'),
        categoryId: Yup.string().required('Selecione uma categoria'),
      })
      console.log(data)

      await schema.validate(data, { abortEarly: false })
      handleUpdateRoom(data)
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
   
    const price = data.price.replace('.', '').replace(',', '.')
    const discount = data.discount.replace('.', '').replace(',', '.')
    const room = new UpdateRoom(
      defaultValue?.id,
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
      streamRoomUpdate
      
    )

    const formData = new FormData()
    if (imageUpload) {
      formData.append('image', imageUpload)
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
        toast.success('Sala atualizada com sucesso!')
        router.push(appRoutes.ROOMS)
      })
      .catch(() => toast.error('Não foi possível atualizar sala!'))
      .finally(() => setUpdate(false))
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


  useEffect(() => {
    try{  
      if (typeof id == 'string') {
       getRoom.get(id).then((data) => {
        formRef.current?.setFieldValue('userId', data.userId)
        formRef.current?.setFieldValue('userId-label', data.teacherName)
        formRef.current?.setFieldValue('categoryId', data.categoryId)
        formRef.current?.setFieldValue('categoryId-label', data.categoryName)
        formRef.current?.setFieldValue('photo', data.imageUrl)
        let inputRefChat = formRef.current?.getFieldRef('itemChat')
        inputRefChat.current.checked = data.isChatActive
        inputRefChat.current.value = data.isChatActive
        let inputRefRoom = formRef.current?.getFieldRef('itemRoom')
        inputRefRoom.current.checked = data.isStreamingRoomActive
        inputRefRoom.current.value = data.isStreamingRoomActive
        setIsToShowStreaming(data.isStreamingRoomActive)
        setStreamingRoom(startStreamingRoomHelper(data?.streamingsRoom))
        setDefaultValue(data)
       }).finally(()=>{
          searchTeachers('').then((data) =>{
          setDefaultTeacherOptions(data)
        })
  
        searchCategories('').then((data) =>{
          setDefaultCategoryOptions(data)
        })
       
       })      
      }           
      getZoomUsers.get().then((zoomUsers) => {
        if (zoomUsers) {
          const options: ISelectOption[] = zoomUsers.map((user) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: user.id,
          }))
          setZoomUsersOptions(options)
        }
      })   
   }
   catch(error){
     toast.error("Não foi possível carregar os dados")
   }
   finally{   
    setTimeout(() => {
      setLoading(false)
     }, 500)     
   }
  }, [])

  return (
    <>
     {loading && <FullLoading />}
     <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
        <h3 className='mb-5 text-muted'>Informações da Sala</h3>
        <InputImage name='photo' handleSingleImageUpload={handleSingleImageUpload} />
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
              defaultValue={currenceMaskOnlyValue(defaultValue?.price)}
              name='price'
              label='Preço'
              type='text'
              placeholderText='R$ 0,00'
              onChange={() => currencyFormatter('price')}
            />
            <Input
              defaultValue={currenceMaskOnlyValue(defaultValue?.discount)}
              name='discount'
              label='Desconto'
              type='text'
              placeholderText='R$ 0,00'
              onChange={() => currencyFormatter('discount')}
            />
            
            <InputNumber name='installments' defaultValue={defaultValue?.installments} label='Quantidade de Parcelas' />
          </div>
          <div className='w-50'>
            <TextArea
              name='description'
              label='Descrição'
              style={{ minHeight: '246px', margin: 0 }}
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
            secondaryMessage='Você precisa adicionar, no mínimo, um item.'
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
          <CustomButton
            customClasses={['btn-secondary', 'w-150px', 'ms-auto', 'me-10']}
            title='Cancelar'
            type='button'
            loading={update}
            onClick={() => {
              router.push(appRoutes.ROOMS)
            }}
          />
          <CustomButton
            type='submit'
            customClasses={['w-180px', 'btn-primary']}
            title='Salvar'
            disabled={update}
          />
        </div>
      </Form>
    </>
  )
}
