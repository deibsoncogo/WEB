import { IBook } from '../../../models/book'
import { InputPagination } from '../../../shared/interface/InputPagination'
import { OutputPagination } from '../../../shared/interface/OutputPagination'

export interface IGetAllBooksParams extends InputPagination {
  name: string
}

export interface IGetAllBooks {
  getAll: (params: IGetAllBooksParams) => Promise<OutputPagination<IBook>>
}
