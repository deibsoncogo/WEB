import { RemoteGetCategories } from '../../../../data/usecases/category/remote-getCategories'
import { IGetCategories } from '../../../../domain/usecases/interfaces/category/getCategories'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetCategories = (): IGetCategories => {
  return new RemoteGetCategories(makeApiUrl('/category'), makeAxiosHttpClient())
}
