import { IBook } from '../../../models/book'

export type IGetBookParams = {
  id: string
}

export interface IGetBook {
  get: (params: IGetBookParams) => Promise<IBook>
}
