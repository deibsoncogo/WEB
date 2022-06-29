import { RemoteEditBook } from '../../../../data/usecases/book/remote-editBook'
import { IEditBook } from '../../../../domain/usecases/interfaces/book/editBook'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteEditBook = (): IEditBook =>
  new RemoteEditBook(makeApiUrl('/book'), makeAxiosHttpClient())
