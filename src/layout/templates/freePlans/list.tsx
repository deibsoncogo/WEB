import { FormHandles } from '@unform/core'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { usePagination } from '../../../application/hooks/usePagination'
import { useRequest } from '../../../application/hooks/useRequest'
import { IFreePlan } from '../../../domain/models/freePlan'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import {
  IDeleteFreePlan,
  IDeleteFreePlanParams,
} from '../../../domain/usecases/interfaces/freePlan/deleteFreePlan'
import {
  IGetFreePlans,
  IGetFreePlansParams,
} from '../../../domain/usecases/interfaces/freePlan/getFreePlans'
import {
  IToggleFreePlanStatus,
  IToggleFreePlanStatusParams,
} from '../../../domain/usecases/interfaces/freePlan/toggleFreePlanStatus'
import { KTSVG } from '../../../helpers'
import { debounce } from '../../../helpers/debounce'
import ConfirmationModal from '../../components/modal/ConfirmationModal'
import { Search } from '../../components/search/Search'
import { FreePlansTable } from '../../components/tables/freePlans-list'

type Props = {
  remoteGetFreePlans: IGetFreePlans
  remoteToggleFreePlanStatus: IToggleFreePlanStatus
  remoteDeleteFreePlan: IDeleteFreePlan
}

export function ListFreePlansTemplate({
  remoteGetFreePlans,
  remoteToggleFreePlanStatus,
  remoteDeleteFreePlan,
}: Props) {
  const [planName, setPlanName] = useState('')
  const [freePlanToToggleStatusId, setFreePlanToToggleStatusId] = useState<string | null>(null)
  const [freePlanToDeletionId, setFreePlanToDeletionId] = useState<string | null>(null)

  const [plans, setPlans] = useState<IFreePlan[]>([])

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage, order } = pagination
  const paginationParams: IGetFreePlansParams = {
    page: currentPage,
    take,
    name: planName,
    order,
    orderBy: pagination.orderBy,
  }

  const searchPlanFormRef = useRef<FormHandles>(null)

  const {
    makeRequest: getPlans,
    data: plansSuccessful,
    error: getPlansError,
    cleanUp: cleanUpGetPlans,
  } = useRequest<OutputPagination<IFreePlan>, IGetFreePlansParams>(remoteGetFreePlans.get)

  const {
    makeRequest: togglePlanStatus,
    data: planStatusToggledSuccessful,
    error: togglePlanStatusError,
    cleanUp: cleanUpTogglePlansStatus,
    loading: loadingTogglePlanStatus,
  } = useRequest<string, IToggleFreePlanStatusParams>(remoteToggleFreePlanStatus.toggle)

  const {
    makeRequest: deleteFreePlan,
    data: deleteFreePlanSuccessful,
    error: deleteFreePlanError,
    cleanUp: cleanUpDeleteFreePlan,
    loading: loadingFreePlanDeletion,
  } = useRequest<string, IDeleteFreePlanParams>(remoteDeleteFreePlan.delete)

  const handleSearchPlan = debounce((text: string) => {
    setPlanName(text)
  })

  const handleOpenToggleStatusConfirmationModal = (params: IToggleFreePlanStatusParams) => {
    setFreePlanToToggleStatusId(params.id)
  }

  const handleOpenDeleteFreePlanConfirmationModal = (freePlanId: string) => {
    setFreePlanToDeletionId(freePlanId)
  }

  const handleCloseDeleteFreePlanConfirmationModal = () => {
    setFreePlanToDeletionId(null)
  }

  const onDeleteFreePlan = () => {
    deleteFreePlan({ id: freePlanToDeletionId as string })
  }

  const handleCloseToggleStatusConfirmationModal = () => {
    setFreePlanToToggleStatusId(null)
  }

  const handleModalConfirmation = () => {
    togglePlanStatus({ id: freePlanToToggleStatusId as string })
  }

  useEffect(() => {
    getPlans(paginationParams)
  }, [
    pagination.take,
    pagination.currentPage,
    pagination.order,
    pagination.orderBy,
    planName,
    planStatusToggledSuccessful,
    deleteFreePlanSuccessful,
  ])

  useEffect(() => {
    if (plansSuccessful) {
      const { data, total } = plansSuccessful
      setTotalPage(total)
      setPlans(data)
      cleanUpGetPlans()
      return
    }

    if (planStatusToggledSuccessful) {
      toast.success('Status do Plano alterado com sucesso!')
      handleCloseToggleStatusConfirmationModal()
      cleanUpTogglePlansStatus()
      return
    }

    if (deleteFreePlanSuccessful) {
      toast.success('Plano Gratuito deletado com sucesso!')
      handleCloseDeleteFreePlanConfirmationModal()
      cleanUpDeleteFreePlan()
    }
  }, [plansSuccessful, planStatusToggledSuccessful, deleteFreePlanSuccessful])

  useEffect(() => {
    if (getPlansError) {
      toast.error(getPlansError)
      return
    }

    if (togglePlanStatusError) {
      toast.error(togglePlanStatusError)
      cleanUpTogglePlansStatus()
      return
    }

    if (deleteFreePlanError) {
      toast.error(deleteFreePlanSuccessful)
      cleanUpDeleteFreePlan()
    }
  }, [getPlansError, deleteFreePlanSuccessful, togglePlanStatusError])

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search ref={searchPlanFormRef} onChangeText={handleSearchPlan} />
          </h3>
          <div className='card-toolbar'>
            <Link href='/freePlans/create'>
              <button className='btn btn-sm btn-light-primary'>
                <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                Novo Plano Gratuito
              </button>
            </Link>
          </div>
        </div>

        <FreePlansTable
          freePlans={plans}
          paginationHook={paginationHook}
          togglePlanStatus={handleOpenToggleStatusConfirmationModal}
          onDeleteFreePlan={handleOpenDeleteFreePlanConfirmationModal}
        />
      </div>

      <ConfirmationModal
        isOpen={!!freePlanToDeletionId}
        loading={loadingFreePlanDeletion}
        onRequestClose={handleCloseDeleteFreePlanConfirmationModal}
        onConfimation={onDeleteFreePlan}
        content='Você tem ceterza que deseja excluir este Plano Gratuito?'
        title='Deletar'
      />

      <ConfirmationModal
        isOpen={!!freePlanToToggleStatusId}
        content='Deseja realmente alterar os status do plano ?'
        loading={loadingTogglePlanStatus}
        onRequestClose={handleCloseToggleStatusConfirmationModal}
        onConfimation={handleModalConfirmation}
        title='Atenção'
      />
    </>
  )
}
