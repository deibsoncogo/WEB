import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { IStreaming } from '../../../domain/models/streaming'
import { ITraining } from '../../../domain/models/training'
import { IGetCategories } from '../../../domain/usecases/interfaces/category/getCategories'
import { IEditTraining } from '../../../domain/usecases/interfaces/trainings/editTraining'
import {
  IGetTraining,
  IGetTrainingParams,
} from '../../../domain/usecases/interfaces/trainings/getTraining'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { formatDate, formatTime } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormEditTraining } from '../../components/forms/trainings/edit'
import { trainingFormSchema } from '../../components/forms/trainings/type'
import { maskedToMoney, onlyNums } from '../../formatters/currenceFormatter'
import { getAsyncCategoiesToSelectInput } from './utils/getAsyncCategoriesToSelectInput'
import { getAsyncTeachersToSelectInput } from './utils/getAsyncTeachersToSelectInput'
import { getIsoDateToBRL } from './utils/getIsoDateToBRL'

type EditTrainingPageProps = {
  remoteGetTeachers: IGetAllUsers
  remoteGetCategories: IGetCategories
  remoteEditTraining: IEditTraining
  remoteGetTraining: IGetTraining
}

function EditTrainingPageTemplate({
  remoteGetTeachers,
  remoteGetCategories,
  remoteEditTraining,
  remoteGetTraining,
}: EditTrainingPageProps) {
  const router = useRouter()
  const { id: trainingId } = router.query

  const [streamList, setStreamList] = useState<IStreaming[]>([])
  const [isStreamingListValid, setIsStreamingListValid] = useState(true)

  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: createTraining,
    data: trainingCreatedSuccessful,
    error: createTrainingError,
    loading: loadingTrainingCreation,
  } = useRequest<FormData>(remoteEditTraining.edit)

  const { makeRequest: getTraining, data: training } = useRequest<ITraining, IGetTrainingParams>(
    remoteGetTraining.get
  )

  async function handleFormSubmit(data: ITraining) {
    const { error, success } = await applyYupValidation<ITraining>(trainingFormSchema, data)

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
    const options = await getAsyncCategoiesToSelectInput({ categoryName, remoteGetCategories })
    return options
  }

  const handleGetAsyncTeachersToSelectInput = async (teacherName: string) => {
    const options = await getAsyncTeachersToSelectInput({ teacherName, remoteGetTeachers })
    return options
  }

  useEffect(() => {
    if (typeof trainingId === 'string') {
      getTraining({ id: trainingId })
    }
  }, [])

  useEffect(() => {
    if (trainingCreatedSuccessful) {
      toast.success('Treinamemto Criado Com Sucesso')
      router.push(appRoutes.TRAININGS)
    }

    if (training) {
      const { streamings, name, description, teacher, price, discount, trainingEndDate } = training

      const formattedStreamings = streamings.map((streaming) => ({
        ...streaming,
        dateISO: streaming.date,
        date: getIsoDateToBRL(streaming.date),
      }))

      formRef.current?.setFieldValue('name', name)
      formRef.current?.setFieldValue('description', description)
      formRef.current?.setFieldValue('teacherId', teacher.id)
      formRef.current?.setFieldValue('teacherId-label', teacher.name)
      formRef.current?.setFieldValue('price', maskedToMoney(price))
      formRef.current?.setFieldValue('discount', maskedToMoney(discount))
      formRef.current?.setFieldValue('trainingEndDate', trainingEndDate)

      setStreamList(formattedStreamings)
      console.log(training)
    }
  }, [trainingCreatedSuccessful, training])

  useEffect(() => {
    if (createTrainingError) {
      toast.error(createTrainingError)
    }
  }, [createTrainingError])

  return (
    <>
      <FormEditTraining
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

export { EditTrainingPageTemplate }
