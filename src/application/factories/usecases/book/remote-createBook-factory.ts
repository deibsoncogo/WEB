import { RemoteCreateBook } from '../../../../data/usecases/book/remote-createBook'
import { ICreateBook } from '../../../../domain/usecases/interfaces/book/createBook'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteCreateBook = (): ICreateBook =>
  new RemoteCreateBook(makeApiUrl('/book'), makeAxiosHttpClient())
