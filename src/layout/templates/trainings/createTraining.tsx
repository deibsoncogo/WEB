import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { IGetCategories } from '../../../domain/usecases/interfaces/category/getCategories'
import {
  ICreateTraining,
  ICreateTrainingParams,
} from '../../../domain/usecases/interfaces/trainings/createTraining'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { Role } from '../../../domain/usecases/interfaces/user/role'
import { formatDate, formatTime } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormCreateTraining } from '../../components/forms/trainings/create'
import { IStreamList, trainingFormSchema } from '../../components/forms/trainings/type'
import { onlyNums } from '../../formatters/currenceFormatter'

type CreateTrainingPageProps = {
  makeGetTeachers: IGetAllUsers
  remoteGetCategories: IGetCategories
  remoteCreateTraining: ICreateTraining
}

function CreateTrainingPageTemplate({
  makeGetTeachers,
  remoteGetCategories,
  remoteCreateTraining,
}: CreateTrainingPageProps) {
  const router = useRouter()
  const [streamList, setStreamList] = useState<IStreamList[]>([])
  const [isStreamingListValid, setIsStreamingListValid] = useState(true)

  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: createTraining,
    data: trainingCreatedSuccessful,
    error: createTrainingError,
    loading: loadingTrainingCreation,
  } = useRequest<FormData>(remoteCreateTraining.create)

  async function handleFormSubmit(data: ICreateTrainingParams) {
    const { error, success } = await applyYupValidation<ICreateTrainingParams>(
      trainingFormSchema,
      data
    )

    if (streamList.length === 0) {
      setIsStreamingListValid(false)
    }

    if (error) {
      formRef?.current?.setErrors(error)
      return
    }

    if (success && streamList.length > 0) {
      const formattedStreamings = streamList.map((stream) => ({
        hour: stream.hour,
        date: stream.dateISO,
      }))
      const formattedData = {
        ...data,
        price: Number(onlyNums(data.price)),
        discount: Number(onlyNums(data.discount)),
        streamings: formattedStreamings,
        trainingEndDate: formatDate(new Date(data.trainingEndDate), 'YYYY-MM-DD'),
        deactiveChatDate: formatDate(new Date(data.deactiveChatDate), 'YYYY-MM-DD'),
      }
      const {
        categoryId,
        description,
        discount,
        name,
        price,
        streamings,
        teacherId,
        photo,
        trainingEndDate,
        deactiveChatDate,
      } = formattedData

      const formData = new FormData()

      if (photo) {
        formData.append('image', photo)
      }
      formData.append('price', String(price))
      formData.append('discount', String(discount))
      formData.append('teacherId', String(teacherId))
      formData.append('categoryId', String(categoryId))
      formData.append('name', String(name))
      formData.append('description', String(description))
      formData.append('active', String(false))
      formData.append('trainingEndDate', String(trainingEndDate))
      formData.append('deactiveChatDate', String(deactiveChatDate))
      const streamingsString = JSON.stringify(streamings)
      formData.append('streamings', streamingsString)

      createTraining(formData)
    }
  }

  function addStreamingDate() {
    const liveData = {
      date: formatDate(formRef.current?.getData().streamingDate, 'DD/MM/YYYY'),
      hour: formatTime(formRef.current?.getData().streamingHour, 'HH:mm'),
      dateISO: formatDate(formRef.current?.getData().streamingDate, 'YYYY-MM-DD'),
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

  const handleGetAsyncCategoriesToSelectInput = async (categoryName: string) => {
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

  const handleGetAsyncTeachersToSelectInput = async (teacherName: string) => {
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

  useEffect(() => {
    if (trainingCreatedSuccessful) {
      toast.success('Treinamemto Criado Com Sucesso')
      router.push(appRoutes.TRAININGS)
    }
  }, [trainingCreatedSuccessful])

  useEffect(() => {
    if (createTrainingError) {
      toast.error(createTrainingError)
    }
  }, [createTrainingError])

  return (
    <>
      <FormCreateTraining
        ref={formRef}
        removeStreamItem={removeStreamItem}
        addStreamingDate={addStreamingDate}
        streamList={streamList}
        onSubmit={handleFormSubmit}
        searchTeachers={handleGetAsyncTeachersToSelectInput}
        searchCategories={handleGetAsyncCategoriesToSelectInput}
        isStreamingListValid={isStreamingListValid}
        loadingSubmit={loadingTrainingCreation}
      />
    </>
  )
}

export { CreateTrainingPageTemplate }
