import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { IStreaming } from '../../../domain/models/streaming'
import { ITraining } from '../../../domain/models/training'
import { IGetCategories } from '../../../domain/usecases/interfaces/category/getCategories'
import { ICreateTraining } from '../../../domain/usecases/interfaces/trainings/createTraining'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { formatDate } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormCreateTraining } from '../../components/forms/trainings/create'
import { trainingFormSchema } from '../../components/forms/trainings/type'
import { onlyNums } from '../../formatters/currenceFormatter'
import { formatTrainingToSubmit } from './utils/formatTrainingToSubmit'
import { getAsyncCategoiesToSelectInput } from './utils/getAsyncCategoriesToSelectInput'
import { getAsyncTeachersToSelectInput } from './utils/getAsyncTeachersToSelectInput'
import { getStreamingDate } from './utils/getStramingDate'

type CreateTrainingPageProps = {
  remoteGetTeachers: IGetAllUsers
  remoteGetCategories: IGetCategories
  remoteCreateTraining: ICreateTraining
}

function CreateTrainingPageTemplate({
  remoteGetTeachers,
  remoteGetCategories,
  remoteCreateTraining,
}: CreateTrainingPageProps) {
  const router = useRouter()
  const [streamList, setStreamList] = useState<IStreaming[]>([])
  const [isStreamingListValid, setIsStreamingListValid] = useState(true)

  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: createTraining,
    data: trainingCreatedSuccessful,
    error: createTrainingError,
    loading: loadingTrainingCreation,
  } = useRequest<FormData>(remoteCreateTraining.create)

  async function handleFormSubmit(data: ITraining) {
    const { error, success } = await applyYupValidation<ITraining>(trainingFormSchema, data)
    console.log(data)

    if (streamList.length === 0) {
      setIsStreamingListValid(false)
    }

    if (error) {
      formRef?.current?.setErrors(error)
      return
    }

    if (success && streamList.length > 0) {
      const dataFormatted = formatTrainingToSubmit(data, streamList)
      createTraining(dataFormatted)
    }
  }

  function addStreamingDate() {
    const streaming = getStreamingDate(formRef)
    if (streaming) {
      if (!isStreamingListValid) {
        setIsStreamingListValid(true)
      }
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
    return options
  }

  const handleCancel = () => {
    router.push(appRoutes.TRAININGS)
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
        onCancel={handleCancel}
        searchTeachers={handleGetAsyncTeachersToSelectInput}
        searchCategories={handleGetAsyncCategoriesToSelectInput}
        isStreamingListValid={isStreamingListValid}
        loadingSubmit={loadingTrainingCreation}
      />
    </>
  )
}

export { CreateTrainingPageTemplate }
