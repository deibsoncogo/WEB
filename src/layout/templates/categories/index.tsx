import { FormHandles } from '@unform/core'
import React, { useEffect, useRef, useState } from 'react'
import { useRequest } from '../../../application/hooks/useRequest'
import {
  CreateCategoryParams,
  ICreateCategory,
} from '../../../domain/usecases/interfaces/category/createCategory'
import {
  GetCategoriesParams,
  IGetCategories,
  OutputPagination,
} from '../../../domain/usecases/interfaces/category/getCategories'
import { KTSVG } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { Category } from '../../../interfaces/model/Category'
import { CreateCategoryDrawer } from '../../components/forms/create-category'
import { Search } from '../../components/search/Search'
import CategoriesTable from '../../components/tables/categories-list'
import * as Yup from 'yup'
import { usePagination } from '../../../application/hooks/usePagination'

type Props = {
  remoteCreateCategory: ICreateCategory
  remoteGetCategories: IGetCategories
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é Nescessário'),
})

function CategoriesTemplate({ remoteGetCategories, remoteCreateCategory }: Props) {
  const [categories, setCategories] = useState<Category[]>([])
  const [modalCreateCategoryActive, setModalCreateCategoryActive] = useState(false)

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage } = pagination
  const paginationParams: GetCategoriesParams = { page: currentPage, take, filters: {} }

  const createCategoryFormRef = useRef<FormHandles>(null)

  const {
    makeRequest: createCategory,
    loading: loadingCategoryCreation,
    error: createCategoryError,
    data: categoryCreated,
  } = useRequest<void, CreateCategoryParams>(remoteCreateCategory.create)

  const {
    makeRequest: getCategories,
    error: getCategoriesError,
    data: paginatedCategories,
  } = useRequest<OutputPagination, GetCategoriesParams>(remoteGetCategories.get)

  const openModalCreateCategory = () => {
    setModalCreateCategoryActive(true)
  }

  const closeModalCreateCategory = () => {
    createCategoryFormRef.current?.reset()
    createCategoryFormRef.current?.setErrors({})
    setModalCreateCategoryActive(false)
  }

  const handleCreateCategory = async (params: CreateCategoryParams) => {
    const { error, success } = await applyYupValidation<typeof schema>(schema, params)

    if (success) {
      createCategory(params)
    }

    if (error) {
      createCategoryFormRef?.current?.setErrors(error)
    }
  }

  useEffect(() => {
    getCategories(paginationParams)
  }, [pagination])

  useEffect(() => {
    if (paginatedCategories) {
      const { data, total } = paginatedCategories
      setTotalPage(total)
      setCategories(data)
    }
  }, [paginatedCategories])

  useEffect(() => {
    if (createCategoryError) {
      createCategoryFormRef.current?.setErrors({ name: createCategoryError })
    }
  }, [createCategoryError])

  useEffect(() => {
    if (categoryCreated) {
      getCategories(paginationParams)
      closeModalCreateCategory()
    }
  }, [categoryCreated])

  return (
    <>
      <CreateCategoryDrawer
        visible={modalCreateCategoryActive}
        close={closeModalCreateCategory}
        createCategory={handleCreateCategory}
        loading={loadingCategoryCreation}
        ref={createCategoryFormRef}
      />

      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search />
          </h3>
          <div className='card-toolbar' onClick={openModalCreateCategory}>
            <button className='btn btn-sm btn-light-primary'>
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Nova Categoria
            </button>
          </div>
        </div>

        <CategoriesTable categories={categories} paginationHook={paginationHook} />
      </div>
    </>
  )
}

export default CategoriesTemplate
