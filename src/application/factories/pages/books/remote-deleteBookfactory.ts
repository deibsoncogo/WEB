import { RemoteDeleteBook } from '../../../../data/usecases/book/remote-deleteBook'
import { IDeleteBook } from '../../../../domain/usecases/interfaces/book/deleteBook'

import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteDeleteBook = (): IDeleteBook => {
  return new RemoteDeleteBook(makeApiUrl('/book'), makeAxiosHttpClient())
}
