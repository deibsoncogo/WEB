import { FormHandles } from '@unform/core'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { usePagination } from '../../../application/hooks/usePagination'
import { useRequest } from '../../../application/hooks/useRequest'
import { IPlan } from '../../../domain/models/plan'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import { IGetPlans, IGetPlansParams } from '../../../domain/usecases/interfaces/plan/getPlans'
import {
  ITogglePlanStatus,
  ITogglePlanStatusParams,
} from '../../../domain/usecases/interfaces/plan/togglePlanStatus'
import { KTSVG } from '../../../helpers'
import { debounce } from '../../../helpers/debounce'
import ConfirmationModal from '../../components/modal/ConfirmationModal'
import { Search } from '../../components/search/Search'
import { PlansTable } from '../../components/tables/plans-list'

type Props = {
  remoteGetPlans: IGetPlans
  remoteTogglePlanStatus: ITogglePlanStatus
}

let planToToggleStatusId: string | null = null
export function ListPlansTemplate({ remoteGetPlans, remoteTogglePlanStatus }: Props) {
  const [planName, setPlanName] = useState('')
  const [toggleStatusPlanConfirmationModalOpen, setToggleStatusPlanConfirmationModalOpen] =
    useState(false)

  const [plans, setPlans] = useState<IPlan[]>([])

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage, order } = pagination
  const paginationParams: IGetPlansParams = {
    page: currentPage,
    take,
    name: planName,
    order,
  }

  const searchPlanFormRef = useRef<FormHandles>(null)

  const {
    makeRequest: getPlans,
    data: plansSuccessful,
    error: getPlansError,
    cleanUp: cleanUpGetPlans,
  } = useRequest<OutputPagination<IPlan>, IGetPlansParams>(remoteGetPlans.get)

  const {
    makeRequest: togglePlanStatus,
    data: planStatusToggledSuccessful,
    error: togglePlanStatusError,
    cleanUp: cleanUpTogglePlansStatus,
    loading: loadingTogglePlanStatus,
  } = useRequest<string, ITogglePlanStatusParams>(remoteTogglePlanStatus.toggle)

  const handleSearchPlan = debounce((text: string) => {
    setPlanName(text)
  })

  const handleOpenToggleStatusConfirmationModal = (params: ITogglePlanStatusParams) => {
    setToggleStatusPlanConfirmationModalOpen(true)
    planToToggleStatusId = params.id
  }

  const handleCloseToggleStatusConfirmationModal = () => {
    setToggleStatusPlanConfirmationModalOpen(false)
    planToToggleStatusId = null
  }

  const handleModalConfirmation = () => {
    if (planToToggleStatusId) {
      togglePlanStatus({ id: planToToggleStatusId })
    }
  }

  useEffect(() => {
    getPlans(paginationParams)
  }, [
    pagination.take,
    pagination.currentPage,
    pagination.order,
    planName,
    planStatusToggledSuccessful,
  ])

  useEffect(() => {
    if (plansSuccessful) {
      const { data, total } = plansSuccessful
      setTotalPage(total)
      setPlans(data)
      cleanUpGetPlans()
    }

    if (planStatusToggledSuccessful) {
      toast.success('Status do plano alterado com sucesso.')
      handleCloseToggleStatusConfirmationModal()
      cleanUpTogglePlansStatus()
    }
  }, [plansSuccessful])

  useEffect(() => {
    if (getPlansError) {
      toast.error(getPlansError)
    }

    if (togglePlanStatusError) {
      toast.error(togglePlanStatusError)
      cleanUpTogglePlansStatus()
    }
  }, [getPlansError])

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search ref={searchPlanFormRef} onChangeText={handleSearchPlan} />
          </h3>
          <div className='card-toolbar'>
            <Link href='/plans/create'>
              <button className='btn btn-sm btn-light-primary'>
                <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                Novo Plano
              </button>
            </Link>
          </div>
        </div>

        <PlansTable
          plans={plans}
          paginationHook={paginationHook}
          togglePlanStatus={handleOpenToggleStatusConfirmationModal}
        />
      </div>

      <ConfirmationModal
        isOpen={toggleStatusPlanConfirmationModalOpen}
        content='Deseja realmente alterar os status do plano ?'
        loading={loadingTogglePlanStatus}
        onRequestClose={handleCloseToggleStatusConfirmationModal}
        onConfimation={handleModalConfirmation}
        title='Atenção'
      />
    </>
  )
}
