import Link from 'next/link'
import { useEffect, useState } from 'react'

import { KTSVG } from '../../../helpers'
import { debounce } from '../../../helpers/debounce'

import { Search } from '../../components/search/Search'
import { usePagination } from '../../../application/hooks/usePagination'
import { TrainingsTable } from '../../components/tables/trainings-list'
import { GetCategoriesParams } from '../../../domain/usecases/interfaces/category/getCategories'

type TrainingsTemplate = {
  remoteGetAllTrainings: IGetAllTrainings
}

export function TrainingsTemplate({ remoteGetAllTrainings }: TrainingsTemplate) {
  const [loading, setLoading] = useState(false)
  const [refresher, setRefresher] = useState(true)
  const [trainings, setTrainings] = useState<ITrainings[]>([] as ITrainings[])
  const [trainingName, setTrainingName] = useState('')

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage } = pagination
  const paginationParams: GetCategoriesParams = {
    page: currentPage,
    take,
    name: trainingName,
    order: undefined,
  }

  async function getTrainings() {
    setLoading(true)
    try {
      const { total, data } = await remoteGetAllTrainings.getAll(paginationParams)
      setTotalPage(total)
      setTrainings(data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleSearch = debounce((text: string) => {
    setTrainingName(text)
  })

  function handleRefresher() {
    setRefresher(!refresher)
  }

  useEffect(() => {
    getTrainings()
  }, [refresher, pagination.take, pagination.totalPages, currentPage, trainingName])

  return (
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
        loading={loading}
        trainings={trainings}
        paginationHook={paginationHook}
        getTrainings={getTrainings}
        handleRefresher={handleRefresher}
      />
    </div>
  )
}
