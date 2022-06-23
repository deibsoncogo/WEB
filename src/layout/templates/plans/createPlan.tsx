import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { appRoutes } from '../../../application/routing/routes'
import { IPlan } from '../../../domain/models/plan'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { IGetAllBooks } from '../../../domain/usecases/interfaces/books/getAllBooks'
import { IGetAllCourses } from '../../../domain/usecases/interfaces/course/getAllCourses'
import { IGetAllRooms } from '../../../domain/usecases/interfaces/rooms/getAllRooms'
import { IGetAllTrainings } from '../../../domain/usecases/interfaces/trainings/getAllTrainings'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormCreatePlan } from '../../components/forms/plans/create'
import { planFormSchema } from '../../components/forms/plans/planSchema'
import { getOptionsFromSearchRequest } from './utils/getOptionsFromSearchRequest'

type Props = {
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
}: Props) => {
  const router = useRouter()
  const [hasAtLastOneProduct, setHasAtLastOneProduct] = useState(true)
  const createPlanFormRef = useRef<FormHandles>(null)

  async function handleFormSubmit(data: IPlan) {
    const { courses = [], trainings = [], books = [], rooms = [] } = data
    const products = courses?.length + books?.length + trainings?.length + rooms?.length

    if (products < 1) {
      setHasAtLastOneProduct(false)
      return
    } else if (!hasAtLastOneProduct) {
      setHasAtLastOneProduct(true)
    }

    const { error, success } = await applyYupValidation<IPlan>(planFormSchema, data)
    console.log(success)

    if (error) {
      createPlanFormRef?.current?.setErrors(error)

      return
    }

    if (success) {
      console.log(success)
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
    />
  )
}

export { CreatePlanPageTemplate }
