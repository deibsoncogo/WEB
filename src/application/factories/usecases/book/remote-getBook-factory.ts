import { RemoteGetBook } from '../../../../data/usecases/book/remote-getBook'
import { IGetBook } from '../../../../domain/usecases/interfaces/book/getBook'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetBook = (): IGetBook =>
  new RemoteGetBook(makeApiUrl('/book'), makeAxiosHttpClient())
