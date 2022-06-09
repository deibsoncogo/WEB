import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { IGetCategories } from '../../../domain/usecases/interfaces/category/getCategories'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { formatDate, formatTime } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormCreateTraining } from '../../components/forms/trainings/create'

export interface IStreamList {
  liveDate: string
  time: string
  start: boolean
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é Nescessário'),
  teacherId: Yup.string().required('Professor é nescessário'),
  price: Yup.number().required('Preço é nescessário'),
  description: Yup.string().required('Descriçao é nescessário'),
  categories: Yup.string().required('Selecione uma categoria'),
  finishDate: Yup.date().nullable().required('Data é nescessária'),
  liveDate: Yup.date().nullable().required('Data é nescessária'),
  chatTime: Yup.date().nullable().required('Data é nescessária'),
  time: Yup.date().nullable().required('Hora é nescessária'),
})

type CreateTrainingPageProps = {
  makeGetTeachers: IGetAllUsers
  remoteGetCategories: IGetCategories
}

function CreateTrainingPageTemplate({
  makeGetTeachers,
  remoteGetCategories,
}: CreateTrainingPageProps) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [defaultValue, setDefaultValue] = useState({})
  const [streamList, setStreamList] = useState<IStreamList[]>([])

  async function handleFormSubmit(data: any) {
    const { error, success } = await applyYupValidation<ITrainings>(schema, data)

    if (success) {
      console.log(data)
      const formData = new FormData()
      formData.append('image', data.photo)
    }

    if (error) {
      formRef?.current?.setErrors(error)
    }
  }

  function addWebinarTime() {
    const liveData = {
      liveDate: formatDate(formRef.current?.getData().liveDate, 'DD/MM/YYYY'),
      time: formatTime(formRef.current?.getData().time, 'HH:mm'),
      start: false,
    }
    if (liveData.liveDate === 'Invalid date' || liveData.time === 'Invalid date') return
    setStreamList([...streamList, liveData])
  }

  function removeStreamItem(index: number) {
    const temp = streamList.slice()
    temp.splice(index, 1)
    setStreamList(temp)
  }

  const handleGetAsyncCategories = async (categoryName: string) => {
    try {
      const { data } = await remoteGetCategories.get({
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

  const handleGetAsyncTeachers = async (teacherName: string) => {
    try {
      const { data } = await makeGetTeachers.getAll({
        name: teacherName,
        order: 'asc',
        page: 1,
        take: 5,
        // role: Role.Teacher,
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

  useEffect(() => {
    handleGetAsyncTeachers('')
  }, [])

  return (
    <FormCreateTraining
      ref={formRef}
      removeStreamItem={removeStreamItem}
      addWebinarTime={addWebinarTime}
      streamList={streamList}
      onSubmit={handleFormSubmit}
      searchTeachers={handleGetAsyncTeachers}
      searchCategories={handleGetAsyncCategories}
    />
  )
}

export { CreateTrainingPageTemplate }
