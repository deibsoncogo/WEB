import { toast } from 'react-toastify'
import { InputPagination } from '../../../../domain/shared/interface/InputPagination'
import { OutputPagination } from '../../../../domain/shared/interface/OutputPagination'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { extractSelectOptionsFromArr } from './extractSelectOptionsFromArr'

export async function getOptionsFromSearchRequest(
  request: (params: any) => Promise<OutputPagination<any>>,
  search: object
): Promise<ISelectOption[]> {
  try {
    const { data } = await request({
      ...search,
      page: 1,
      take: 5,
      order: 'asc',
    })
    const options: ISelectOption[] = extractSelectOptionsFromArr(data)

    return options
  } catch (e: any) {
    console.log('aqui', e)
    toast.error(e?.message)
    return []
  }
}
