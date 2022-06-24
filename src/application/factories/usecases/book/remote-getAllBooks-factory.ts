import { RemoteGetAllBooks } from '../../../../data/usecases/book/remote-getAllBooks'
import { IGetAllBooks } from '../../../../domain/usecases/interfaces/books/getAllBooks'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetAllBooks = (): IGetAllBooks => {
  return new RemoteGetAllBooks(makeApiUrl('/book'), makeAxiosHttpClient())
}
