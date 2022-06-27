import { RemoteGetBooks } from '../../../../data/usecases/book/remote-getBooks'
import { IGetBooks } from '../../../../domain/usecases/interfaces/book/getBooks'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetBooks = (): IGetBooks => {
  return new RemoteGetBooks(makeApiUrl(`/book/`), makeAxiosHttpClient())
}

export const makeRemoteGetBookById = (id?: string): IGetBooks => {
  return new RemoteGetBooks(makeApiUrl(`/book/${id}`), makeAxiosHttpClient())
}
