import { ITransaction } from '../../../models/transaction'
import { InputPagination } from '../../../shared/interface/InputPagination'

export interface IGetAllUserTransactionsParams extends InputPagination {
  name?: string
}
export interface IGetAllUserTransactions {
  getAll: () => Promise<ITransaction[]>
}
