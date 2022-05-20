import React, { useState } from 'react'
import {
  CreateCategoryParams,
  ICreateCategory,
} from '../../../domain/usecases/interfaces/category/createCategory'
import { KTSVG } from '../../../helpers'
import { CreateCategoryDrawer } from '../../components/forms/create-category'
import { Search } from '../../components/search/Search'
import CategoriesTable from '../../components/tables/categories-list'

type Props = {
  remoteCreateCategory: ICreateCategory
}

function CategoriesTemplate({}: Props) {
  const [modalCreateCategoryActive, setModalCreateCategoryActive] = useState(false)

  const openModalCreateCategory = () => {
    setModalCreateCategoryActive(true)
  }

  const closeModalCreateCategory = () => {
    setModalCreateCategoryActive(false)
  }

  const createCategory = async (params: CreateCategoryParams) => {}

  return (
    <>
      <CreateCategoryDrawer
        visible={modalCreateCategoryActive}
        close={closeModalCreateCategory}
        createCategory={createCategory}
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

        <CategoriesTable categories={[]} />
      </div>
    </>
  )
}

export default CategoriesTemplate
