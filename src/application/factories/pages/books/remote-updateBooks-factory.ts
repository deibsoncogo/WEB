import { RemoteUpdateBook } from '../../../../data/usecases/book/remote-updateBook'
import { IUpdateBook, UpdateBookParams } from '../../../../domain/usecases/interfaces/book/getBooks'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteUpdateBook = (): IUpdateBook => {
  return new RemoteUpdateBook(makeApiUrl(`/book/`), makeAxiosHttpClient())
}
