import { RemoteUpdateCategory } from '../../../../data/usecases/category/remote-updateCategory'
import { IUpdateCategory } from '../../../../domain/usecases/interfaces/category/updateCategory'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteUpdateCategory = (): IUpdateCategory => {
  return new RemoteUpdateCategory(makeApiUrl('category'), makeAxiosHttpClient())
}
