import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { IPlan } from '../../../domain/models/plan'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { IGetAllBooks } from '../../../domain/usecases/interfaces/book/getAllBooks'
import { IGetCategoriesNoPagination } from '../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { IGetAllCourses } from '../../../domain/usecases/interfaces/course/getAllCourses'
import { IGetPlan, IGetPlanParams } from '../../../domain/usecases/interfaces/plan/getPlan'
import { IEditPlan } from '../../../domain/usecases/interfaces/plan/updatePlan'

import { IGetAllRooms } from '../../../domain/usecases/interfaces/room/getAllRooms'
import { IGetAllTrainings } from '../../../domain/usecases/interfaces/trainings/getAllTrainings'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { extractSelectOptionsFromArr, getOptionsFromSearchRequest } from '../../../utils'
import { getAsyncCategoiesNoPaginationToSelectInput } from '../../../utils/getAsyncCategoriesNoPaginationToSelectInput'
import { FormEditFreePlan } from '../../components/forms/freePlan/edit'
import { freePlanFormSchema } from '../../components/forms/freePlan/freePlanSchema'
import { formatFreePlanToSubmit } from './utils/formatFreePlanToSubmit'

type Props = {
  remoteGetPlan: IGetPlan
  remoteEditPlan: IEditPlan
  remoteGetCourses: IGetAllCourses
  remoteGetTrainings: IGetAllTrainings
  remoteGetBooks: IGetAllBooks
  remoteGetRooms: IGetAllRooms
  remoteGetCategoriesNoPagination: IGetCategoriesNoPagination
}

const EditFreePlanPageTemplate = ({
  remoteGetCourses,
  remoteGetTrainings,
  remoteGetBooks,
  remoteGetRooms,
  remoteGetPlan,
  remoteEditPlan,
  remoteGetCategoriesNoPagination,
}: Props) => {
  const router = useRouter()
  const { id: planId } = router.query

  const [hasAtLastOneProduct, setHasAtLastOneProduct] = useState(true)
  const [freePlan, setFreePlan] = useState<IPlan | null>(null)

  const editPlanFormRef = useRef<FormHandles>(null)

  const {
    makeRequest: editPlan,
    data: editPlanSuccessful,
    loading: editPlanLoading,
    error: editPlanError,
    cleanUp: cleanUpEditPlan,
  } = useRequest<void, FormData>(remoteEditPlan.edit)

  const {
    makeRequest: getPlan,
    data: getPlanSuccessful,
    error: getPlanError,
    cleanUp: cleanUpGetPlan,
  } = useRequest<IPlan, IGetPlanParams>(remoteGetPlan.get)

  async function handleFormSubmit(data: IPlan) {
    const { courses = [], trainings = [], books = [], rooms = [] } = data
    const products = courses?.length + books?.length + trainings?.length + rooms?.length

    const { error, success } = await applyYupValidation<IPlan>(freePlanFormSchema, data)

    if (error) {
      editPlanFormRef?.current?.setErrors(error)
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
      const dataFormatted = formatFreePlanToSubmit(success)
      dataFormatted.append('id', String(planId))
      dataFormatted.append('isActive', String(freePlan?.isActive))
      editPlan(dataFormatted)
    }
  }

  async function handleGetCoursesOptions(searchValue: string): Promise<ISelectOption[]> {
    return getOptionsFromSearchRequest({
      request: remoteGetCourses.getAll,
      search: {
        name: searchValue || '',
        allRecords: true,
      },
    })
  }

  async function handleGetTrainingsOptions(searchValue: string): Promise<ISelectOption[]> {
    return getOptionsFromSearchRequest({
      request: remoteGetTrainings.getAll,
      search: {
        name: searchValue || '',
        allRecords: true,
      },
    })
  }

  async function handleGetBooksOptions(searchValue: string): Promise<ISelectOption[]> {
    return getOptionsFromSearchRequest({
      request: remoteGetBooks.getAll,
      search: {
        name: searchValue || '',
        allRecords: true,
      },
    })
  }

  async function handleGetRoomsOptions(searchValue: string): Promise<ISelectOption[]> {
    return getOptionsFromSearchRequest({
      request: remoteGetRooms.getAll,
      search: {
        name: searchValue || '',
        allRecords: true,
      },
    })
  }

  const handleGetAsyncCategoriesToSelectInput = async (categoryName: string) => {
    return getAsyncCategoiesNoPaginationToSelectInput({
      categoryName,
      remoteGetCategoriesNoPagination,
    })
  }

  const handleClickCancel = () => {
    router.push(appRoutes.FREE_PLANS)
  }

  const setFiledValue = (field: string, value: any) => {
    editPlanFormRef.current?.setFieldValue(field, value)
  }

  useEffect(() => {
    if (planId) {
      getPlan({ id: String(planId) })
    }
  }, [])

  useEffect(() => {
    if (editPlanSuccessful) {
      toast.success('Plano Gratuito editado com sucesso')
      cleanUpEditPlan()
      router.push(appRoutes.FREE_PLANS)
    }

    if (getPlanSuccessful) {
      setFreePlan(getPlanSuccessful)
      cleanUpGetPlan()
    }
  }, [editPlanSuccessful, getPlanSuccessful])

  useEffect(() => {
    if (editPlanError) {
      toast.error(editPlanError)
      cleanUpEditPlan()
    }

    if (getPlanError) {
      toast.error(getPlanError)
    }
  }, [editPlanError, getPlanError])

  useEffect(() => {
    if (freePlan) {
      const {
        name,
        category,
        description,
        imageUrl,
        intervalAccess,
        trainings = [],
        courses = [],
        books = [],
        rooms = [],
      } = freePlan

      setFiledValue('name', name)
      setFiledValue('description', description)
      setFiledValue('imagePreview', imageUrl)
      setFiledValue('intervalAccess', intervalAccess)
      setFiledValue('courses', extractSelectOptionsFromArr(courses))
      setFiledValue('books', extractSelectOptionsFromArr(books))
      setFiledValue('rooms', extractSelectOptionsFromArr(rooms))
      setFiledValue('trainings', extractSelectOptionsFromArr(trainings))
      setFiledValue('categoryId', category.id)
      setFiledValue('categoryId-label', category.name)
    }
  }, [freePlan])

  return (
    <FormEditFreePlan
      ref={editPlanFormRef}
      onSubmit={handleFormSubmit}
      onCancel={handleClickCancel}
      loadCoursesOptions={handleGetCoursesOptions}
      loadTrainingsOptions={handleGetTrainingsOptions}
      loadBooksOptions={handleGetBooksOptions}
      loadRoomsOptions={handleGetRoomsOptions}
      hasAtLastOneProduct={hasAtLastOneProduct}
      loadingFormSubmit={editPlanLoading}
      searchCategories={handleGetAsyncCategoriesToSelectInput}
    />
  )
}

export { EditFreePlanPageTemplate }
