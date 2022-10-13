import { toast } from 'react-toastify'
import { ISelectOption } from '../domain/shared/interface/SelectOption'
import { IGetCategoriesNoPagination } from '../domain/usecases/interfaces/category/getAllGategoriesNoPagination'

type Params = {
  categoryName: string
  remoteGetCategoriesNoPagination: IGetCategoriesNoPagination
}

const getAsyncCategoiesNoPaginationToSelectInput = async ({
  categoryName,
  remoteGetCategoriesNoPagination,
}: Params): Promise<ISelectOption[]> => {
  try {
    const categories = await remoteGetCategoriesNoPagination.get({ name: categoryName })

    const categoryOptions: ISelectOption[] = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }))

    return categoryOptions
  } catch {
    toast.error('Falha em buscar categorias!')
    return []
  }
}

export { getAsyncCategoiesNoPaginationToSelectInput }
