import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { usePagination } from '../../../application/hooks/usePagination'
import { useRequest } from '../../../application/hooks/useRequest'
import { roles } from '../../../application/wrappers/authWrapper'
import { ITraining } from '../../../domain/models/training'
import { IGetAllTeacherTrainings } from '../../../domain/usecases/interfaces/trainings/getAllTeacherTrainings'
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
import { keys } from '../../../helpers/KeyConstants'
import { IToken } from '../../../interfaces/application/token'
import ConfirmationModal from '../../components/modal/ConfirmationModal'
import { Search } from '../../components/search/Search'
import { TrainingsTable } from '../../components/tables/trainings-list'

type ITrainingsTemplate = {
  remoteGetAllTrainings: IGetAllTrainings
  remoteGetAllTeacherTrainings: IGetAllTeacherTrainings
  remoteToggleTrainingStatus: IToggleTrainingStatus
}

export function TrainingsTemplate({
  remoteGetAllTrainings,
  remoteGetAllTeacherTrainings,
  remoteToggleTrainingStatus,
}: ITrainingsTemplate) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [userId, setUserId] = useState('')
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
      if (!isAdmin && userId) {
        const { total, data } = await remoteGetAllTeacherTrainings.getAll(paginationParams, userId)
        setTrainings(data)
        setTotalPage(total)
        return;
      } 
      
      if (isAdmin && userId) {
        const { total, data } = await remoteGetAllTrainings.getAll(paginationParams)
        setTrainings(data)
        setTotalPage(total)
      }
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
    const token = localStorage.getItem(keys.TOKEN)
    if (token) {
      const values = jwtDecode<IToken>(token)
      setUserId(values.id)
      setIsAdmin(values.role === roles.ADMIN)
    }
  }, [])

  useEffect(() => {
    getTrainings()
  }, [
    refresher,
    pagination.take,
    pagination.totalPages,
    pagination.order,
    pagination.orderBy,
    currentPage,
    trainingName,
    selectedTraining,
    isAdmin,
    userId
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

          {isAdmin && (
            <div className='card-toolbar'>
              <Link href='/trainings/create'>
                <a className='btn btn-sm btn-light-primary'>
                  <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                  Novo Treinamento
                </a>
              </Link>
            </div>
          )}
        </div>

        <TrainingsTable
          trainings={trainings}
          paginationHook={paginationHook}
          handleRefresher={handleRefresher}
          openToggleStatusConfirmationModal={handleOpenToggleStatusConfirmationModal}
          isAdmin={isAdmin}
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
