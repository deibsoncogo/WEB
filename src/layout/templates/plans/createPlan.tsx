import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { IPlan } from '../../../domain/models/plan'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { IGetAllBooks } from '../../../domain/usecases/interfaces/books/getAllBooks'
import { IGetAllCourses } from '../../../domain/usecases/interfaces/course/getAllCourses'
import { ICreatePlan } from '../../../domain/usecases/interfaces/plan/createPlan'
import { IGetAllRooms } from '../../../domain/usecases/interfaces/room/getAllRooms'
import { IGetAllTrainings } from '../../../domain/usecases/interfaces/trainings/getAllTrainings'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormCreatePlan } from '../../components/forms/plans/create'
import { planFormSchema } from '../../components/forms/plans/planSchema'
import { formatPlanToSubmit } from './utils/formatPlanToSubmit'
import { getOptionsFromSearchRequest } from './utils/getOptionsFromSearchRequest'

type Props = {
  remoteCreatePlan: ICreatePlan
  remoteGetCourses: IGetAllCourses
  remoteGetTrainings: IGetAllTrainings
  remoteGetBooks: IGetAllBooks
  remoteGetRooms: IGetAllRooms
}

const CreatePlanPageTemplate = ({
  remoteGetCourses,
  remoteGetTrainings,
  remoteGetBooks,
  remoteGetRooms,
  remoteCreatePlan,
}: Props) => {
  const router = useRouter()
  const [hasAtLastOneProduct, setHasAtLastOneProduct] = useState(true)
  const createPlanFormRef = useRef<FormHandles>(null)

  const {
    makeRequest: createPlan,
    data: createPlanSuccessful,
    loading: createPlanLoading,
    error: createPlanError,
    cleanUp: cleanUpCreatePlan,
  } = useRequest<void, FormData>(remoteCreatePlan.create)

  async function handleFormSubmit(data: IPlan) {
    const { courses = [], trainings = [], books = [], rooms = [] } = data
    const products = courses?.length + books?.length + trainings?.length + rooms?.length

    const { error, success } = await applyYupValidation<IPlan>(planFormSchema, data)

    if (error) {
      createPlanFormRef?.current?.setErrors(error)
    }

    if (products < 1) {
      setHasAtLastOneProduct(false)
    } else if (!hasAtLastOneProduct) {
      setHasAtLastOneProduct(true)
    }

    if (error || products < 1) {
      return
    }

    if (success) {
      const dataFormatted = formatPlanToSubmit(success)
      dataFormatted.append('isActive', String(false))
      createPlan(dataFormatted)
    }
  }

  async function handleGetCoursesOptions(searchValue: string): Promise<ISelectOption[]> {
    return getOptionsFromSearchRequest(remoteGetCourses.getAll, {
      filters: { name: searchValue || '' },
    })
  }

  async function handleGetTrainingsOptions(searchValue: string): Promise<ISelectOption[]> {
    return getOptionsFromSearchRequest(remoteGetTrainings.getAll, { name: searchValue || '' })
  }

  async function handleGetBooksOptions(searchValue: string): Promise<ISelectOption[]> {
    return getOptionsFromSearchRequest(remoteGetBooks.getAll, { name: searchValue || '' })
  }

  async function handleGetRoomsOptions(searchValue: string): Promise<ISelectOption[]> {
    return getOptionsFromSearchRequest(remoteGetRooms.getAll, { name: searchValue || '' })
  }

  const handleClickCancel = () => {
    router.push(appRoutes.PLANS)
  }

  useEffect(() => {
    if (createPlanSuccessful) {
      toast.success('Plano criado com sucesso')
      cleanUpCreatePlan()
      router.push(appRoutes.PLANS)
    }
  }, [createPlanSuccessful])

  useEffect(() => {
    if (createPlanError) {
      toast.error(createPlanError)
      cleanUpCreatePlan()
    }
  }, [createPlanError])

  return (
    <FormCreatePlan
      ref={createPlanFormRef}
      onSubmit={handleFormSubmit}
      onCancel={handleClickCancel}
      loadCoursesOptions={handleGetCoursesOptions}
      loadTrainingsOptions={handleGetTrainingsOptions}
      loadBooksOptions={handleGetBooksOptions}
      loadRoomsOptions={handleGetRoomsOptions}
      hasAtLastOneProduct={hasAtLastOneProduct}
      loadingFormSubmit={createPlanLoading}
    />
  )
}

export { CreatePlanPageTemplate }