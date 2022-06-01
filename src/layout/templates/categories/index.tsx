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
import { debounce } from '../../../helpers/debounce'
import {
  DeleteCategoryParams,
  IDeleteCategory,
} from '../../../domain/usecases/interfaces/category/deleteCategory'
import { toast } from 'react-toastify'
import { UpdateCategoryDrawer } from '../../components/forms/update-category'
import {
  IUpdateCategory,
  UpdateCategoryParams,
} from '../../../domain/usecases/interfaces/category/updateCategory'
import { IExportCategories } from '../../../domain/usecases/interfaces/category/exportCategories'

type Props = {
  remoteCreateCategory: ICreateCategory
  remoteGetCategories: IGetCategories
  remoteDeleteCategory: IDeleteCategory
  remoteUpdateCategory: IUpdateCategory
  remoteExportCategoires: IExportCategories
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é Nescessário'),
})

function CategoriesTemplate({
  remoteGetCategories,
  remoteCreateCategory,
  remoteDeleteCategory,
  remoteUpdateCategory,
  remoteExportCategoires,
}: Props) {
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>()
  const [isDrawerCreateCategoryOpen, setIsDrawerCreateCategoryOpen] = useState(false)
  const [isDrawerUpdateCategoryOpen, setIsDrawerUpdateCategoryOpen] = useState(false)

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage } = pagination
  const paginationParams: GetCategoriesParams = { page: currentPage, take, name: categoryName }

  const createCategoryFormRef = useRef<FormHandles>(null)
  const updateCategoryFormRef = useRef<FormHandles>(null)
  const searchCategoryFormRef = useRef<FormHandles>(null)

  const {
    makeRequest: createCategory,
    loading: loadingCategoryCreation,
    error: createCategoryError,
    data: categoryCreated,
    cleanUp: cleanUpCreateCategory,
  } = useRequest<void, CreateCategoryParams>(remoteCreateCategory.create)

  const {
    makeRequest: getCategories,
    error: getCategoriesError,
    data: paginatedCategories,
  } = useRequest<OutputPagination, GetCategoriesParams>(remoteGetCategories.get)

  const {
    makeRequest: deleteCategory,
    error: deleteCategoryError,
    data: categorySuccessfullDeleted,
    loading: loadingCategoryDeletion,
    cleanUp: cleanUpDeleteCategory,
  } = useRequest<string, DeleteCategoryParams>(remoteDeleteCategory.delete)

  const {
    makeRequest: updateCategory,
    error: updateCategoryError,
    data: categorySuccessfullUpdated,
    loading: loadingCategoryUpdate,
    cleanUp: cleanUpUpdateCategory,
  } = useRequest<string, UpdateCategoryParams>(remoteUpdateCategory.update)

  const handleOpenModalCreateCategory = () => {
    setIsDrawerCreateCategoryOpen(true)
  }

  const handleCloseModalCreateCategory = () => {
    createCategoryFormRef.current?.reset()
    createCategoryFormRef.current?.setErrors({})
    setIsDrawerCreateCategoryOpen(false)
  }

  const handleCreateCategory = async (params: CreateCategoryParams) => {
    const { error, success } = await applyYupValidation<CreateCategoryParams>(schema, params)

    if (success) {
      createCategory(params)
    }

    if (error) {
      createCategoryFormRef?.current?.setErrors(error)
    }
  }

  const handleSearchCategory = debounce((text: string) => {
    setCategoryName(text)
  })

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      deleteCategory({ id: selectedCategory.id })
    }
  }

  const handleSelectedCategory = (category: Category | undefined) => {
    if (category) {
      setSelectedCategory(category)
    }
  }

  const handleUpdateCategory = async (params: UpdateCategoryParams) => {
    if (!selectedCategory) return

    if (selectedCategory.name === params.name) {
      handleCloseDrawerUpdateCategory()
      return
    }

    const fullParams = { ...params, id: selectedCategory?.id }

    const { error, success } = await applyYupValidation<UpdateCategoryParams>(schema, fullParams)

    if (success) {
      updateCategory(fullParams)
    }

    if (error) {
      updateCategoryFormRef?.current?.setErrors(error)
    }
  }

  const handleOpenDrawerUpdateCategory = (category: Category) => {
    setIsDrawerUpdateCategoryOpen(true)
    setSelectedCategory(category)
    updateCategoryFormRef.current?.setFieldValue('name', category?.name)
  }

  const handleCloseDrawerUpdateCategory = () => {
    updateCategoryFormRef.current?.reset()
    updateCategoryFormRef.current?.setErrors({})
    setIsDrawerUpdateCategoryOpen(false)
  }

  useEffect(() => {
    getCategories(paginationParams)
  }, [
    pagination.take,
    pagination.currentPage,
    categoryName,
    categorySuccessfullDeleted,
    categorySuccessfullUpdated,
    categoryCreated,
  ])

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
    if (deleteCategoryError) {
      toast.error(deleteCategoryError)
    }

    if (getCategoriesError) {
      toast.error(getCategoriesError)
    }

    if (updateCategoryError) {
      toast.error(updateCategoryError)
    }
  }, [deleteCategoryError, getCategoriesError, updateCategoryError])

  useEffect(() => {
    if (categorySuccessfullDeleted) {
      toast.success('Categoria deletada com sucesso')
      cleanUpDeleteCategory()
    }

    if (categoryCreated) {
      toast.success('Categoria criada com  sucesso')
      handleCloseModalCreateCategory()
      cleanUpCreateCategory()
    }

    if (categorySuccessfullUpdated) {
      toast.success('Categoria atualizada com sucesso')
      handleCloseDrawerUpdateCategory()
      cleanUpUpdateCategory()
    }
  }, [categorySuccessfullDeleted, categoryCreated, categorySuccessfullUpdated])

  return (
    <>
      <CreateCategoryDrawer
        visible={isDrawerCreateCategoryOpen}
        close={handleCloseModalCreateCategory}
        createCategory={handleCreateCategory}
        loading={loadingCategoryCreation}
        ref={createCategoryFormRef}
      />

      <UpdateCategoryDrawer
        visible={isDrawerUpdateCategoryOpen}
        close={handleCloseDrawerUpdateCategory}
        updateCategory={handleUpdateCategory}
        loading={loadingCategoryUpdate}
        ref={updateCategoryFormRef}
      />

      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search ref={searchCategoryFormRef} onChangeText={handleSearchCategory} />
          </h3>
          <div className='card-toolbar' onClick={handleOpenModalCreateCategory}>
            <button className='btn btn-sm btn-light-primary'>
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Nova Categoria
            </button>
          </div>
        </div>

        <CategoriesTable
          categories={categories}
          paginationHook={paginationHook}
          deleteCategory={handleDeleteCategory}
          loadingDeletion={loadingCategoryDeletion}
          setSelectedCategory={handleSelectedCategory}
          openUpdateCategoryDrawer={handleOpenDrawerUpdateCategory}
          exportCategories={remoteExportCategoires.export}
        />
      </div>
    </>
  )
}

export default CategoriesTemplate
