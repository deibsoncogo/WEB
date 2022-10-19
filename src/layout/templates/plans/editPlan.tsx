import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { IPlan, PlanType } from '../../../domain/models/plan'
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
import { FormEditPlan } from '../../components/forms/plans/edit'
import { planFormSchema } from '../../components/forms/plans/planSchema'
import { planTypeOptions } from '../../components/forms/plans/planTypeOptions'
import { maskedToMoney } from '../../formatters/currenceFormatter'
import { formatPlanToSubmit } from './utils/formatPlanToSubmit'
import { planTypeOptions } from '../../components/forms/plans/planTypeOptions'

type Props = {
  remoteGetPlan: IGetPlan
  remoteEditPlan: IEditPlan
  remoteGetCourses: IGetAllCourses
  remoteGetTrainings: IGetAllTrainings
  remoteGetBooks: IGetAllBooks
  remoteGetRooms: IGetAllRooms
  remoteGetCategoriesNoPagination: IGetCategoriesNoPagination
}

const EditPlanPageTemplate = ({
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
  const [planType, setPlanType] = useState<PlanType | null>(null)
  const [plan, setPlan] = useState<IPlan | null>(null)

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

    const { error, success } = await applyYupValidation<IPlan>(planFormSchema, data)

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
      const dataFormatted = formatPlanToSubmit(success)
      dataFormatted.append('id', String(planId))
      dataFormatted.append('isActive', String(plan?.isActive))
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

  const handleClickCancel = () => {
    router.push(appRoutes.PLANS)
  }

  const handlePlanTypeChange = (newPlanType: PlanType) => {
    setPlanType(newPlanType)
  }

  const setFiledValue = (field: string, value: any) => {
    editPlanFormRef.current?.setFieldValue(field, value)
  }

  const handlePlanTypeSet = () => {
    if (plan) {
      if (plan.planType === PlanType.SINGLE_PAYMENT) {
        setFiledValue('installments', plan.installments)
        setFiledValue('intervalAccess', plan.intervalAccess)
      }

      if (plan.planType === PlanType.RECURRING_PAYMENT) {
        setFiledValue('intervalPaymentMonths', plan.intervalPaymentMonths)
      }
    }
  }

  useEffect(() => {
    if (planId) {
      getPlan({ id: String(planId) })
    }
  }, [])

  useEffect(() => {
    if (editPlanSuccessful) {
      toast.success('Plano editado com sucesso!')
      cleanUpEditPlan()
      router.push(appRoutes.PLANS)
    }

    if (getPlanSuccessful) {
      setPlan(getPlanSuccessful)
      cleanUpGetPlan()
    }
  }, [editPlanSuccessful, getPlanSuccessful])

  useEffect(() => {
    if (editPlanError) {
      toast.error(editPlanError + '!')
      cleanUpEditPlan()
    }

    if (getPlanError) {
      toast.error(getPlanError + '!')
    }
  }, [editPlanError, getPlanError])

  useEffect(() => {
    if (plan) {
      const {
        name,
        price,
        planType: defaultPlan,
        description,
        category,
        imageUrl,
        trainings = [],
        courses = [],
        books = [],
        rooms = [],
      } = plan
      
      setFiledValue('planType', planType || defaultPlan)
      setFiledValue(
        'planType-label',
        planType ? planTypeOptions.find(({ value }) => value === planType)?.label : defaultPlan
      )
      setPlanType(planType || defaultPlan)
      setFiledValue('name', name)
      setFiledValue('price', maskedToMoney(price))
      setFiledValue('description', description)
      setFiledValue('imagePreview', imageUrl)
      setFiledValue('courses', extractSelectOptionsFromArr(courses))
      setFiledValue('books', extractSelectOptionsFromArr(books))
      setFiledValue('rooms', extractSelectOptionsFromArr(rooms))
      setFiledValue('trainings', extractSelectOptionsFromArr(trainings))
      setFiledValue('categoryId', category.id)
      setFiledValue('categoryId-label', category.name)

      handlePlanTypeSet()
    }
  }, [plan])

  const handleGetAsyncCategoriesToSelectInput = async (categoryName: string) => {
    return getAsyncCategoiesNoPaginationToSelectInput({
      categoryName,
      remoteGetCategoriesNoPagination,
    })
  }

  useEffect(() => {
    if (plan) {
      handlePlanTypeSet()
    }
  }, [planType])

  return (
    <FormEditPlan
      ref={editPlanFormRef}
      onSubmit={handleFormSubmit}
      onCancel={handleClickCancel}
      loadCoursesOptions={handleGetCoursesOptions}
      loadTrainingsOptions={handleGetTrainingsOptions}
      loadBooksOptions={handleGetBooksOptions}
      loadRoomsOptions={handleGetRoomsOptions}
      hasAtLastOneProduct={hasAtLastOneProduct}
      loadingFormSubmit={editPlanLoading}
      planType={planType as PlanType}
      planTypeChange={handlePlanTypeChange}
      searchCategories={handleGetAsyncCategoriesToSelectInput}
    />
  )
}

export { EditPlanPageTemplate }
