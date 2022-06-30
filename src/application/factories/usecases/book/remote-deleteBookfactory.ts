import { RemoteDeleteBook } from '../../../../data/usecases/book/remote-deleteBook'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteDeleteBooks = (id: string): IDeleteBook =>
  new RemoteDeleteBook(makeApiUrl(`/book/${id}`), makeAxiosHttpClient())
