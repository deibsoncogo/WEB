import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { IStreaming } from '../../../domain/models/streaming'
import { ITraining } from '../../../domain/models/training'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { IGetCategories } from '../../../domain/usecases/interfaces/category/getCategories'
import { IEditTraining } from '../../../domain/usecases/interfaces/trainings/editTraining'
import {
  IGetTraining,
  IGetTrainingParams,
} from '../../../domain/usecases/interfaces/trainings/getTraining'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { IGetZoomUsers } from '../../../domain/usecases/interfaces/zoom/getZoomUsers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormEditTraining } from '../../components/forms/trainings/edit'
import { trainingFormSchema } from '../../components/forms/trainings/type'
import { maskedToMoney } from '../../formatters/currenceFormatter'
import { formatTrainingToSubmit } from './utils/formatTrainingToSubmit'
import { getAsyncCategoiesToSelectInput } from './utils/getAsyncCategoriesToSelectInput'
import { getAsyncTeachersToSelectInput } from './utils/getAsyncTeachersToSelectInput'
import { getIsoDateToBRL } from './utils/getIsoDateToBRL'
import { getStreamingDate } from './utils/getStramingDate'

type EditTrainingPageProps = {
  remoteGetTeachers: IGetAllUsers
  remoteGetCategories: IGetCategories
  remoteEditTraining: IEditTraining
  remoteGetTraining: IGetTraining
  remoteGetZoomUsers: IGetZoomUsers
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
  const [zoomUsersOptions, setZoomUsersOptions] = useState<ISelectOption[]>([])

  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: editTraining,
    data: trainingEditedSuccessful,
    error: editTrainingError,
    loading: loadingTrainingEdition,
  } = useRequest<FormData>(remoteEditTraining.edit)

  const {
    makeRequest: getTraining,
    data: training,
    error: getTrainingError,
  } = useRequest<ITraining, IGetTrainingParams>(remoteGetTraining.get)

  async function handleFormSubmit(data: ITraining) {
    const { error, success } = await applyYupValidation<ITraining>(trainingFormSchema, data)
    console.log(data)

    if (success && streamList.length > 0) {
      const dataFormatted = formatTrainingToSubmit(data, streamList)
      dataFormatted.append('id', String(trainingId))
      editTraining(dataFormatted)
      return
    }

    if (error || streamList.length === 0) {
      formRef?.current?.setErrors(error || {})

      if (streamList.length === 0) {
        formRef.current?.setFieldError('streamingDate', 'Insira pelo menos uma transmissão')
      }
    }
  }

  function addStreamingDate() {
    const streaming = getStreamingDate(formRef)
    if (streaming) {
      setStreamList([...streamList, streaming])
    }
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
    console.log(options)
    return options
  }

  const handleCancel = () => {
    router.push(appRoutes.TRAININGS)
  }

  useEffect(() => {
    if (typeof trainingId === 'string') {
      getTraining({ id: trainingId })
    }
  }, [])

  useEffect(() => {
    if (trainingEditedSuccessful) {
      toast.success('Treinamemto Editado Com Sucesso')
      router.push(appRoutes.TRAININGS)
    }

    if (training) {
      const {
        streamings,
        name,
        description,
        teacher,
        price,
        discount,
        trainingEndDate,
        deactiveChatDate,
        category,
        imageUrl,
        installments,
        zoomUserId,
      } = training

      const formattedStreamings = streamings.map((streaming) => ({
        ...streaming,
        dateISO: streaming.date,
        date: getIsoDateToBRL(streaming.date),
      }))

      formRef.current?.setFieldValue('name', name)
      formRef.current?.setFieldValue('description', description)
      formRef.current?.setFieldValue('installments', installments)
      formRef.current?.setFieldValue('teacherId', teacher.id)
      formRef.current?.setFieldValue('teacherId-label', teacher.name)
      formRef.current?.setFieldValue('categoryId', category.id)
      formRef.current?.setFieldValue('categoryId-label', category.name)
      formRef.current?.setFieldValue('price', maskedToMoney(price))
      formRef.current?.setFieldValue('discount', maskedToMoney(discount))
      formRef.current?.setFieldValue('trainingEndDate', new Date(trainingEndDate))
      formRef.current?.setFieldValue('deactiveChatDate', new Date(deactiveChatDate))
      formRef.current?.setFieldValue('photo', imageUrl)
      formRef.current?.setFieldValue('zoomUserId', zoomUserId)
      setStreamList(formattedStreamings)
    }
  }, [trainingEditedSuccessful, training])

  useEffect(() => {
    if (getTrainingError) {
      toast.error(getTrainingError)
    }

    if (editTrainingError) {
      toast.error(editTrainingError)
    }
  }, [editTrainingError, getTrainingError])

  return (
    <>
      <FormEditTraining
        ref={formRef}
        removeStreamItem={removeStreamItem}
        addStreamingDate={addStreamingDate}
        streamList={streamList}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
        searchTeachers={handleGetAsyncTeachersToSelectInput}
        searchCategories={handleGetAsyncCategoriesToSelectInput}
        loadingSubmit={loadingTrainingEdition}
        zoomUsersOptions={zoomUsersOptions}
      />
    </>
  )
}

export { EditTrainingPageTemplate }
