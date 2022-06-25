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
import { ICreateTraining } from '../../../domain/usecases/interfaces/trainings/createTraining'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { IGetZoomUsers, IZoomUser } from '../../../domain/usecases/interfaces/zoom/getZoomUsers'
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
  remoteGetZoomUsers: IGetZoomUsers
}

function CreateTrainingPageTemplate({
  remoteGetTeachers,
  remoteGetCategories,
  remoteCreateTraining,
  remoteGetZoomUsers,
}: CreateTrainingPageProps) {
  const router = useRouter()
  const [streamList, setStreamList] = useState<IStreaming[]>([])
  const [zoomUsersOptions, setZoomUsersOptions] = useState<ISelectOption[]>([])
  const [defaultCategoryOptions, setDefaultCategoryOptions] = useState<ISelectOption[]>([])
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
    const { error, success } = await applyYupValidation<ITraining>(trainingFormSchema, {
      ...data,
      price: onlyNums(data.price),
    })

    if (error || streamList.length === 0) {
      formRef?.current?.setErrors(error || {})

      if (streamList.length === 0) {
        formRef.current?.setFieldError('streamingDate', 'Insira pelo menos uma transmissão')
      }
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
      setStreamList([...streamList, streaming])
    }
  }

  function removeStreamItem(index: number) {
    const temp = streamList.slice()
    temp.splice(index, 1)
    setStreamList(temp)
  }

  const handleGetAsyncCategoriesToSelectInput = async (categoryName: string) => {
    return getAsyncCategoiesToSelectInput({ categoryName, remoteGetCategories })
  }

  const handleGetAsyncTeachersToSelectInput = async (teacherName: string) => {
    return getAsyncTeachersToSelectInput({ teacherName, remoteGetTeachers })
  }

  const handlePopulateSelectInputs = async () => {
    const teacherOptions = await handleGetAsyncTeachersToSelectInput('')
    const categoryOptions = await handleGetAsyncCategoriesToSelectInput('')

    setDefaultTeacherOptions(teacherOptions)
    setDefaultCategoryOptions(categoryOptions)
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
      toast.success('Treinamemto Criado Com Sucesso')
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
      toast.error(createTrainingError)
    }

    if (getZoomUsersError) {
      toast.error(getZoomUsersError)
    }
  }, [createTrainingError, getZoomUsersError])

  return (
    <>
      <FormCreateTraining
        ref={formRef}
        removeStreamItem={removeStreamItem}
        addStreamingDate={addStreamingDate}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
        searchTeachers={handleGetAsyncTeachersToSelectInput}
        searchCategories={handleGetAsyncCategoriesToSelectInput}
        streamList={streamList}
        loadingSubmit={loadingTrainingCreation}
        zoomUsersOptions={zoomUsersOptions}
        defaultCategoryOptions={defaultCategoryOptions}
        defaultTeacherOptions={defaultTeacherOptions}
      />
    </>
  )
}

export { CreateTrainingPageTemplate }
