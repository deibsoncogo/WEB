import { RemoteDeleteCategory } from '../../../../data/usecases/category/remote-deleteCategory'
import { IDeleteCategory } from '../../../../domain/usecases/interfaces/category/deleteCategory'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteDeleteCategories = (): IDeleteCategory => {
  return new RemoteDeleteCategory(makeApiUrl('category'), makeAxiosHttpClient())
}
