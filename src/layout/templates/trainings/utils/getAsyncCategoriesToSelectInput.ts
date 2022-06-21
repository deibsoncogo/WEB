import { toast } from 'react-toastify'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { IGetCategories } from '../../../../domain/usecases/interfaces/category/getCategories'

type Params = {
  categoryName: string
  remoteGetCategories: IGetCategories
}

const getAsyncCategoiesToSelectInput = async ({
  categoryName,
  remoteGetCategories,
}: Params): Promise<ISelectOption[]> => {
  try {
    const { data } = await remoteGetCategories.get({
      name: categoryName,
      order: 'asc',
      page: 1,
      take: 5,
    })

    const categoryOptions: ISelectOption[] = data.map((category) => ({
      label: category.name,
      value: category.id,
    }))

    return categoryOptions
  } catch {
    toast.error('Falha em buscar categorias')
    return []
  }
}

export { getAsyncCategoiesToSelectInput }
