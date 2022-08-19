import { toast } from 'react-toastify'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { IGetCategoriesNoPagination } from '../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'

const getAsyncCategoiesNoPaginationToSelectInput = async (
  remoteGetCategoriesNoPagination: IGetCategoriesNoPagination): Promise<ISelectOption[]> => {
  try {
    const categories = await remoteGetCategoriesNoPagination.get()

    const categoryOptions: ISelectOption[] = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }))

    return categoryOptions
  } catch {
    toast.error('Falha em buscar categorias')
    return []
  }
}

export { getAsyncCategoiesNoPaginationToSelectInput }
