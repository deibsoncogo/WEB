import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { IGetCategories } from '../../../domain/usecases/interfaces/category/getCategories'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { Role } from '../../../domain/usecases/interfaces/user/role'
import { formatDate, formatTime } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormCreateTraining } from '../../components/forms/trainings/create'
import { IStreamList, trainingFormSchema } from '../../components/forms/trainings/type'

type CreateTrainingPageProps = {
  makeGetTeachers: IGetAllUsers
  remoteGetCategories: IGetCategories
}

function CreateTrainingPageTemplate({
  makeGetTeachers,
  remoteGetCategories,
}: CreateTrainingPageProps) {
  const [streamList, setStreamList] = useState<IStreamList[]>([])
  const [isStreamingListValid, setIsStreamingListValid] = useState(true)

  const formRef = useRef<FormHandles>(null)

  async function handleFormSubmit(data: any) {
    const { error, success } = await applyYupValidation<ITrainings>(trainingFormSchema, data)

    if (streamList.length === 0) {
      setIsStreamingListValid(false)
    }

    if (error) {
      formRef?.current?.setErrors(error)
    }

    if (success && streamList.length > 0) {
      const formData = new FormData()
      formData.append('image', data.photo)
    }
  }

  function addStreamingHour() {
    const liveData = {
      hour: formatDate(formRef.current?.getData().streamingDate, 'DD/MM/YYYY'),
      date: formatTime(formRef.current?.getData().streamingHour, 'HH:mm'),
      start: false,
    }

    const isInvalidDate = liveData.date === 'Invalid date' || liveData.hour === 'Invalid date'
    if (isInvalidDate) {
      return
    }

    if (!isStreamingListValid) {
      setIsStreamingListValid(true)
    }

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

  console.log(formRef.current?.getErrors())

  const handleGetAsyncTeachers = async (teacherName: string) => {
    try {
      const { data } = await makeGetTeachers.getAll({
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

  console.log(formRef.current?.getErrors())
  return (
    <>
      <FormCreateTraining
        ref={formRef}
        removeStreamItem={removeStreamItem}
        addStreamingHour={addStreamingHour}
        streamList={streamList}
        onSubmit={handleFormSubmit}
        searchTeachers={handleGetAsyncTeachers}
        searchCategories={handleGetAsyncCategories}
        isStreamingListValid={isStreamingListValid}
      />
    </>
  )
}

export { CreateTrainingPageTemplate }
