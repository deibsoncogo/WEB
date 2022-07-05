import { RemoteCreateCategory } from '../../../../data/usecases/category/remote-createCategory'
import { ICreateCategory } from '../../../../domain/usecases/interfaces/category/createCategory'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteCreateCategory = (): ICreateCategory => {
  return new RemoteCreateCategory(makeApiUrl('category'), makeAxiosHttpClient())
}
