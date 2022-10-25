import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { IStreaming } from '../../../domain/models/streaming'
import { ITraining } from '../../../domain/models/training'
import { IEditTraining } from '../../../domain/usecases/interfaces/trainings/editTraining'
import { IGetTraining, IGetTrainingParams } from '../../../domain/usecases/interfaces/trainings/getTraining'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormEditTraining } from '../../components/forms/trainings/edit'
import { trainingFormSchema } from '../../components/forms/trainings/type'
import { FullLoading } from '../../components/FullLoading/FullLoading'
import { maskedToMoney, onlyNums } from '../../formatters/currenceFormatter'
import { formatTrainingToSubmit } from './utils/formatTrainingToSubmit'
import { getAsyncTeachersToSelectInput } from './utils/getAsyncTeachersToSelectInput'
import { getIsoDateToBRL } from './utils/getIsoDateToBRL'
import { getStreamingDate } from './utils/getStramingDate'

type EditTrainingPageProps = {
  remoteGetTeachers: IGetAllUsers
  remoteEditTraining: IEditTraining
  remoteGetTraining: IGetTraining
}

function EditTrainingPageTemplate({
  remoteGetTeachers,
  remoteEditTraining,
  remoteGetTraining
}: EditTrainingPageProps) {
  const router = useRouter()
  const { id: trainingId } = router.query

  const [streamList, setStreamList] = useState<IStreaming[]>([])
  const [loadingPageData, setLoadingPageData] = useState(true)

  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: editTraining,
    data: trainingEditedSuccessful,
    error: editTrainingError,
    loading: loadingTrainingEdition,
    cleanUp: cleanUpGetTraining,
  } = useRequest<FormData>(remoteEditTraining.edit)

  const {
    makeRequest: getTraining,
    data: trainingData,
    error: getTrainingError,
    cleanUp: getTrainingCleanUp,
  } = useRequest<ITraining, IGetTrainingParams>(remoteGetTraining.get)

  async function handleFormSubmit(data: ITraining) {
    data.price = onlyNums(data.price)
    data.discount = onlyNums(data?.discount)
    const { error, success } = await applyYupValidation<ITraining>(trainingFormSchema(data), {
      ...data,
    })

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

  const handleGetAsyncTeachersToSelectInput = async (teacherName: string) => {
    return getAsyncTeachersToSelectInput({ teacherName, remoteGetTeachers })
  }

  const handleCancel = () => {
    router.push(appRoutes.TRAININGS)
  }

  const formatStreamingList = (streamings: IStreaming[]): IStreaming[] => {
    return streamings.map((streaming) => {
      return {
        ...streaming,
        dateISO: streaming.date,
        date: getIsoDateToBRL(streaming.date),
      }
    })
  }

  useEffect(() => {
    if (trainingEditedSuccessful) {
      toast.success('Treinamento editado com sucesso!')
      cleanUpGetTraining()
      router.push(appRoutes.TRAININGS)
    }

    if (trainingData) {
      const {
        streamings,
        name,
        description,
        teacher,
        price,
        discount,
        trainingEndDate,
        deactiveChatDate,
        level,
        imageUrl,
        installments,
        zoomUserId,
        zoomUserName,
        isActive,
      } = trainingData
      const formattedStreamings = formatStreamingList(streamings)

      const trainingEndDateNew = new Date(trainingEndDate)
      const deactiveChatDateNew = new Date(deactiveChatDate)

      formRef.current?.setFieldValue('name', name)
      formRef.current?.setFieldValue('description', description)
      formRef.current?.setFieldValue('installments', installments)
      formRef.current?.setFieldValue('teacherId', teacher.id)
      formRef.current?.setFieldValue('teacherId-label', teacher.name)
      formRef.current?.setFieldValue('level', level)
      formRef.current?.setFieldValue('price', maskedToMoney(price))
      formRef.current?.setFieldValue('discount', maskedToMoney(discount))
      formRef.current?.setFieldValue('trainingEndDate', new Date(trainingEndDateNew.setTime(trainingEndDateNew.getTime() + 1000 * 60 * 60 * 3)))
      formRef.current?.setFieldValue('deactiveChatDate', new Date(deactiveChatDateNew.setTime(deactiveChatDateNew.getTime() + 1000 * 60 * 60 * 3)))
      formRef.current?.setFieldValue('imagePreview', imageUrl)
      formRef.current?.setFieldValue('zoomUserId', zoomUserId)
      formRef.current?.setFieldValue('zoomUserId-label', zoomUserName)
      formRef.current?.setFieldValue('active', isActive)
      setStreamList(formattedStreamings)

      setLoadingPageData(false)
      getTrainingCleanUp()
    }

    getTraining({ id: trainingId as string })
  }, [trainingEditedSuccessful, trainingData])

  useEffect(() => {
    if (getTrainingError) {
      toast.error(getTrainingError + '!')
      router.push(appRoutes.TRAININGS)
    }

    if (editTrainingError) {
      toast.error(editTrainingError + '!')
      setLoadingPageData(false)
    }
  }, [editTrainingError, getTrainingError])

  return (
    <>
      {loadingPageData && <FullLoading />}
      <FormEditTraining
        ref={formRef}
        removeStreamItem={removeStreamItem}
        addStreamingDate={addStreamingDate}
        streamList={streamList}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
        searchTeachers={handleGetAsyncTeachersToSelectInput}
        loadingSubmit={loadingTrainingEdition}
      />
    </>
  )
}

export { EditTrainingPageTemplate }

