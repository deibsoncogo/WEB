import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles, useField } from '@unform/core'

import { Loading } from '@nextui-org/react'
import { InputImage } from '../../../inputs/input-image'
import { Input, TextArea } from '../../../inputs'
import { SelectAsync } from '../../../inputs/selectAsync'
import { ICreateCourse } from '../../../../../domain/usecases/interfaces/course/createCourse'
import { ICategory } from '../../../../../interfaces/api-response/categoryResponse'
import { IGetAllUsersByRole } from '../../../../../domain/usecases/interfaces/user/getAllUsersByRole'
import { IGetCategoriesNoPagination } from '../../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { IUserPartialResponse } from '../../../../../interfaces/api-response/userPartialResponse'
import { FileUpload } from '../../../../../domain/models/fileUpload'
import { CourseClass } from '../../../../../domain/models/courseClass'
import { IGetCategories } from '../../../../../domain/usecases/interfaces/category/getCategories'
import { IGetAllUsers } from '../../../../../domain/usecases/interfaces/user/getAllUsers'
import { Role } from '../../../../../domain/usecases/interfaces/user/role'
import { ISelectOption } from '../../../../../domain/shared/interface/SelectOption'
import { toast } from 'react-toastify'
import { appRoutes } from '../../../../../application/routing/routes'
import { CreateRoom } from '../../../../../domain/models/createRoom'
import { ICreateRoom } from '../../../../../domain/usecases/interfaces/room/createRoom'
import CustomButton from '../../../buttons/CustomButton'
import RoomInternalTable from './roomInternalTable'

type Props = {
  createRoom: ICreateRoom
  getCategories: IGetCategories
  getUsers: IGetAllUsers
}

export function FormCreateRoom({ createRoom, getCategories, getUsers }: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(true)
  const [registerRoom, setRegisterRoom] = useState(false)
  const [isToShowStreaming, setIsToShowStreaming] = useState(false)
  const [imageUpload, setImageUpload] = useState<File>()
  const [courseClass, setCourseClass] = useState<CourseClass[]>([])
  const [hasErrorClass, setHasErrorClass] = useState(false)

  const handleSingleImageUpload = (file: File) => {
    setImageUpload(file)
  }

  const currencyFormatter = (name: string) => {
    var value = formRef.current?.getFieldValue(name)

    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{2})$/g, ',$1')

    if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    }
    formRef.current?.setFieldValue(name, value)
    if (value == 'NaN') formRef.current?.setFieldValue(name, '')
  }

  async function handleFormSubmit(data: IFormRoom) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        photo: Yup.mixed().required('Imagem é necessária'),
        name: Yup.string().required('Nome é necessário'),
        userId: Yup.string().required('Selecione um professor'),
        price: Yup.string().required('Preço é necessário'),
        installments: Yup.number()
          .typeError('Quantidade de parcelas deve ser um número')
          .required('Quantidade de parcelas é necessário')
          .positive('Quantidade de parcelas deve ser positiva')
          .integer('Quantidade de parcelas deve ser um número inteiro'),
        discount: Yup.string().required('Desconto é necessário'),
        description: Yup.string().required('Descriçao é necessária'),
        categoryId: Yup.string().required('Selecione uma categoria'),
      })

      await schema.validate(data, { abortEarly: false })
      handleCreateRoom(data)
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
      price,
      data.userId,
      data.categoryId
    )

    const formData = new FormData()
    if (imageUpload) {
      formData.append('image', imageUpload)
    }
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
    try {
      const { data } = await getUsers.getAll({
        name: teacherName,
        order: 'asc',
        page: 1,
        take: 5,
        role: Role.Teacher,
      })

      const teacherOptions: ISelectOption[] = data.map((teacher) => ({
        label: teacher.name,
        value: teacher.id,
      }))

      return teacherOptions
    } catch {
      toast.error('Falha em buscar os professores')
      return []
    }
  }

  const searchCategories = async (categoryName: string) => {
    try {
      const { data } = await getCategories.get({
        name: categoryName,
        order: 'asc',
        page: 1,
        take: 5,
      })

      const categoryOptions: ISelectOption[] = data.map((category) => ({
        label: category.name,
        value: category.id,
      }))

      return categoryOptions
    } catch {
      toast.error('Falha em buscar as categorias')
      return []
    }
  }

  const callAlert = () =>{
    alert("É babado")
  }

  return (
    <>
      <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
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
            <Input min='1' name='installments' label='Quantidade de Parcelas' type='number' />
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
            />
          </div>
        </div>

        <h3 className='fs-6 fw-bolder text-dark'>Itens</h3>
        <div className='form-check form-check-inline'>
          <input className='form-check-input' type='checkbox' name='itemChat' value='option1' />
          <label className='form-check-label text-dark  fs-6'>Chat</label>
        </div>
        <div className='form-check form-check-inline'>
          <input
            className='form-check-input'
            type='checkbox'
            name='itemRoom'
            value='option2'
            onChange={() => setIsToShowStreaming(!isToShowStreaming)}
          />
          <label className='form-check-label text-dark fs-6'>Transmissão ao vivo</label>
        </div>

        {isToShowStreaming && (
          <div >
            <h3 className='mb-5 mt-5 text-muted'>Datas da Transmissão</h3>

            <RoomInternalTable courseClassArray={courseClass} />
          </div>
        )}

        <div className='d-flex mt-10'>
          <CustomButton
            customClasses={['btn-secondary', 'w-150px', 'ms-auto', 'me-10']}
            title='Cancelar'
            type='button'
            loading={registerRoom}
            onClick={() => {
              router.push(appRoutes.ROOMS)
            }}
          />
          <CustomButton
            type='submit'
            customClasses={['w-180px', 'btn-primary']}
            title='Salvar'
            disabled={registerRoom}
          />
        </div>
      </Form>
    </>
  )
}
