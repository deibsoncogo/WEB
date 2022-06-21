import { RemoteGetCategoriesNoPagination } from '../../../../data/usecases/category/remote-getAllCategoriesNoPagination'
import { IGetCategoriesNoPagination } from '../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetCategoriesNoPagination = (): IGetCategoriesNoPagination => {
  return new RemoteGetCategoriesNoPagination(makeApiUrl('category/getAllNoPagination'), makeAxiosHttpClient())
}
