import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { IStreaming } from '../../../domain/models/streaming'
import { ITraining } from '../../../domain/models/training'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { ICreateTraining } from '../../../domain/usecases/interfaces/trainings/createTraining'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { IGetZoomUsers, IZoomUser } from '../../../domain/usecases/interfaces/zoom/getZoomUsers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { getZoomUserName } from '../../../utils/getZoomUserName'
import { FormCreateTraining } from '../../components/forms/trainings/create'
import { trainingFormSchema } from '../../components/forms/trainings/type'
import { onlyNums } from '../../formatters/currenceFormatter'
import { formatTrainingToSubmit } from './utils/formatTrainingToSubmit'
import { getAsyncTeachersToSelectInput } from './utils/getAsyncTeachersToSelectInput'
import { getStreamingDate } from './utils/getStramingDate'

type CreateTrainingPageProps = {
  remoteGetTeachers: IGetAllUsers
  remoteCreateTraining: ICreateTraining
  remoteGetZoomUsers: IGetZoomUsers
}

function CreateTrainingPageTemplate({ remoteGetTeachers, remoteCreateTraining, remoteGetZoomUsers }: CreateTrainingPageProps) {
  const router = useRouter()
  const [streamList, setStreamList] = useState<IStreaming[]>([])
  const [zoomUsersOptions, setZoomUsersOptions] = useState<ISelectOption[]>([])
  const [defaultTeacherOptions, setDefaultTeacherOptions] = useState<ISelectOption[]>([])

  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: createTraining,
    data: trainingCreatedSuccessful,
    error: createTrainingError,
    loading: loadingTrainingCreation,
  } = useRequest<FormData>(remoteCreateTraining.create)

  const {
    makeRequest: getZoomUsers,
    data: zoomUsers,
    error: getZoomUsersError,
  } = useRequest<IZoomUser[]>(remoteGetZoomUsers.get)

  async function handleFormSubmit(data: ITraining) {
    data.price = onlyNums(data.price)
    data.discount = onlyNums(data?.discount)

    data.zoomUserName = getZoomUserName(zoomUsers!, data.zoomUserId)

    const { error, success } = await applyYupValidation<ITraining>(trainingFormSchema(data), { ...data })

    if (error || streamList.length === 0) {
      formRef?.current?.setErrors(error || {})

      if (streamList.length === 0) {
        formRef.current?.setFieldError('streamingDate', 'Insira pelo menos uma transmiss??o')
      }

      return
    }

    if (success && streamList.length > 0) {
      const dataFormatted = formatTrainingToSubmit(data, streamList)
      dataFormatted.append('active', 'false')
      createTraining(dataFormatted)
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

  const handlePopulateSelectInputs = async () => {
    const teacherOptions = await handleGetAsyncTeachersToSelectInput('')
    setDefaultTeacherOptions(teacherOptions)
  }

  const handleCancel = () => {
    router.push(appRoutes.TRAININGS)
  }

  useEffect(() => {
    getZoomUsers()
    handlePopulateSelectInputs()
  }, [])

  useEffect(() => {
    if (trainingCreatedSuccessful) {
      toast.success('Treinamento cadastrado com sucesso!')
      router.push(appRoutes.TRAININGS)
    }

    if (zoomUsers) {
      const options: ISelectOption[] = zoomUsers.map((user) => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id,
      }))
      
      setZoomUsersOptions(options)
    }
  }, [trainingCreatedSuccessful, zoomUsers])

  useEffect(() => {
    if (createTrainingError) {
      toast.error(createTrainingError + '!')
    }

    if (getZoomUsersError) {
      toast.error(getZoomUsersError + '!')
    }
  }, [createTrainingError, getZoomUsersError])

  return (
    <FormCreateTraining
      ref={formRef}
      removeStreamItem={removeStreamItem}
      addStreamingDate={addStreamingDate}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
      searchTeachers={handleGetAsyncTeachersToSelectInput}
      streamList={streamList}
      loadingSubmit={loadingTrainingCreation}
      zoomUsersOptions={zoomUsersOptions}
      defaultTeacherOptions={defaultTeacherOptions}
    />
  )
}

export { CreateTrainingPageTemplate }
