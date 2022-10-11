import { toast } from 'react-toastify'
import { InputPagination } from '../domain/shared/interface/InputPagination'
import { OutputPagination } from '../domain/shared/interface/OutputPagination'
import { ISelectOption } from '../domain/shared/interface/SelectOption'
import { extractSelectOptionsFromArr } from './extractSelectOptionsFromArr'

type Params = {
  request: (params: any) => Promise<OutputPagination<any>>
  search: Partial<InputPagination>
  hasType?: boolean
}

export async function getOptionsFromSearchRequest({
  request,
  search,
  hasType,
}: Params): Promise<ISelectOption[]> {
  try {
    const { data } = await request({
      ...search,
      page: 1,
      take: 5,
      order: 'asc',
    })
    const options: ISelectOption[] = extractSelectOptionsFromArr(data, hasType)

    return options
  } catch (e: any) {
    toast.error(e?.message + '!')
    return []
  }
}
