import { makeApiUrl, makeAxiosHttpClient } from '../../http'
import { RemoteUpdateBook } from '../../../../data/usecases/book/remote-updateBook'

export const makeRemoteUpdateBooks = (): IUpdateBook =>
  new RemoteUpdateBook(makeApiUrl('/book'), makeAxiosHttpClient())
