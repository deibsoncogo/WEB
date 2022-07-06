import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { usePagination } from '../../../application/hooks/usePagination'
import { useRequest } from '../../../application/hooks/useRequest'
import { ITraining } from '../../../domain/models/training'
import {
  IGetAllTrainings,
  IGetAllTrainingsParams,
} from '../../../domain/usecases/interfaces/trainings/getAllTrainings'
import {
  IToggleTrainingStatus,
  IToggleTrainingStatusParams,
} from '../../../domain/usecases/interfaces/trainings/toggleTrainingStatus'
import { KTSVG } from '../../../helpers'
import { debounce } from '../../../helpers/debounce'
import ConfirmationModal from '../../components/modal/ConfirmationModal'
import { Search } from '../../components/search/Search'
import { TrainingsTable } from '../../components/tables/trainings-list'

type ITrainingsTemplate = {
  remoteGetAllTrainings: IGetAllTrainings
  remoteToggleTrainingStatus: IToggleTrainingStatus
}

export function TrainingsTemplate({
  remoteGetAllTrainings,
  remoteToggleTrainingStatus,
}: ITrainingsTemplate) {
  const [refresher, setRefresher] = useState(true)
  const [trainings, setTrainings] = useState<ITraining[]>([] as ITraining[])
  const [trainingName, setTrainingName] = useState('')
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null)
  const [toggleStatusConfirmationModalOpen, setToggleStatusConfirmationModalOpen] = useState(false)

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage, order } = pagination
  const paginationParams: IGetAllTrainingsParams = {
    page: currentPage,
    name: trainingName,
    take,
    order,
    orderBy: pagination.orderBy,
  }

  const {
    makeRequest: toggleTrainingStatus,
    data: toggleStatusSuccessful,
    cleanUp: toggleStatusCleanUp,
    error: toggleStatusError,
    loading: toggleStatusLoading,
  } = useRequest<string, IToggleTrainingStatusParams>(remoteToggleTrainingStatus.toggle)

  const handleOpenToggleStatusConfirmationModal = (trainingId: string) => {
    setToggleStatusConfirmationModalOpen(true)
    setSelectedTraining(trainingId)
  }

  const handleCloseToggleStatusConfirmationModal = () => {
    setToggleStatusConfirmationModalOpen(false)
    setSelectedTraining(null)
  }

  const handleToggleStatusTraining = () => {
    if (selectedTraining) {
      toggleTrainingStatus({ id: selectedTraining })
    }
  }

  async function getTrainings() {
    try {
      const { total, data } = await remoteGetAllTrainings.getAll(paginationParams)
      setTotalPage(total)
      setTrainings(data)
    } catch (err) {
      toast.error('Erro ao buscar treinamentos.')
    }
  }

  const handleSearch = debounce((text: string) => {
    setTrainingName(text)
  })

  function handleRefresher() {
    setRefresher(!refresher)
  }

  useEffect(() => {
    getTrainings()
  }, [
    pagination.take,
    pagination.totalPages,
    pagination.order,
    pagination.orderBy,
    currentPage,
    trainingName,
    selectedTraining,
  ])

  useEffect(() => {
    if (toggleStatusSuccessful) {
      toast.success('Status do treinamento atualizado com sucesso.')
      handleCloseToggleStatusConfirmationModal()
      toggleStatusCleanUp()
    }
  }, [toggleStatusSuccessful])

  useEffect(() => {
    if (toggleStatusError) {
      toast.error('Error ao alterar o status do treinamento')
      toggleStatusCleanUp()
    }
  }, [toggleStatusError])

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search onChangeText={handleSearch} />
          </h3>

          <div className='card-toolbar'>
            <Link href='/trainings/create'>
              <a className='btn btn-sm btn-light-primary'>
                <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                Novo Treinamento
              </a>
            </Link>
          </div>
        </div>

        <TrainingsTable
          trainings={trainings}
          paginationHook={paginationHook}
          getTrainings={getTrainings}
          openToggleStatusConfirmationModal={handleOpenToggleStatusConfirmationModal}
        />
      </div>

      <ConfirmationModal
        isOpen={toggleStatusConfirmationModalOpen}
        content='Deseja realmente alterar os status do treinamento ?'
        loading={toggleStatusLoading}
        onRequestClose={handleCloseToggleStatusConfirmationModal}
        onConfimation={handleToggleStatusTraining}
        title='Atenção'
      />
    </>
  )
}
