import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePagination } from '../../../application/hooks/usePagination'
import { ITraining } from '../../../domain/models/training'
import { GetCategoriesParams } from '../../../domain/usecases/interfaces/category/getCategories'
import {
  IGetAllTrainings,
  IGetAllTrainingsParams,
} from '../../../domain/usecases/interfaces/trainings/getAllTrainings'
import { KTSVG } from '../../../helpers'
import { debounce } from '../../../helpers/debounce'
import { Search } from '../../components/search/Search'
import { TrainingsTable } from '../../components/tables/trainings-list'

type TrainingsTemplate = {
  remoteGetAllTrainings: IGetAllTrainings
}

export function TrainingsTemplate({ remoteGetAllTrainings }: TrainingsTemplate) {
  const [trainings, setTrainings] = useState<ITraining[]>([] as ITraining[])
  const [trainingName, setTrainingName] = useState('')

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

  async function getTrainings() {
    try {
      const { total, data } = await remoteGetAllTrainings.getAll(paginationParams)
      setTotalPage(total)
      setTrainings(data as ITraining[])
    } catch (err) {
      console.log(err)
    }
  }

  const handleSearch = debounce((text: string) => {
    setTrainingName(text)
  })

  useEffect(() => {
    getTrainings()
  }, [
    pagination.take,
    pagination.totalPages,
    pagination.order,
    pagination.orderBy,
    currentPage,
    trainingName,
  ])

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
        trainings={trainings}
        paginationHook={paginationHook}
        getTrainings={getTrainings}
      />
    </div>
  )
}
