import { RemoteExportCategories } from '../../../../data/usecases/category/remote-exportCategories'
import { IExportCategories } from '../../../../domain/usecases/interfaces/category/exportCategories'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteExportCategories = (): IExportCategories => {
  return new RemoteExportCategories(makeApiUrl('/category/export'), makeAxiosHttpClient())
}
