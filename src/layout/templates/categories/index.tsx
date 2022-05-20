import { FormHandles } from '@unform/core'
import React, { useEffect, useRef, useState } from 'react'
import { useRequest } from '../../../application/hooks/useRequest'
import {
  CreateCategoryParams,
  ICreateCategory,
} from '../../../domain/usecases/interfaces/category/createCategory'
import { IGetCategories } from '../../../domain/usecases/interfaces/category/createGetCategories'
import { KTSVG } from '../../../helpers'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { Category } from '../../../interfaces/model/Category'
import { CreateCategoryDrawer } from '../../components/forms/create-category'
import { Search } from '../../components/search/Search'
import CategoriesTable from '../../components/tables/categories-list'
import * as Yup from 'yup'

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

  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: createCategory,
    loading: loadingCategoryCreation,
    error: createCategoryError,
    data: categoryCreated,
  } = useRequest<void, CreateCategoryParams>(remoteCreateCategory.create)

  const openModalCreateCategory = () => {
    setModalCreateCategoryActive(true)
  }

  const closeModalCreateCategory = () => {
    formRef.current?.reset()
    formRef.current?.setErrors({})
    setModalCreateCategoryActive(false)
  }

  const handleCreateCategory = async (params: CreateCategoryParams) => {
    const { error, success } = await applyYupValidation<typeof schema>(schema, params)

    if (success) {
      createCategory(params)
    }

    if (error) {
      formRef?.current?.setErrors(error)
    }
  }

  const getCategories = async () => {
    const categories = await remoteGetCategories.get()
    setCategories(categories)
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (createCategoryError) {
      formRef.current?.setErrors({ name: createCategoryError })
    }
  }, [createCategoryError])

  useEffect(() => {
    if (categoryCreated) {
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
        ref={formRef}
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

        <CategoriesTable categories={categories} />
      </div>
    </>
  )
}

export default CategoriesTemplate
