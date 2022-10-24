import { ITransaction } from '../../../models/transaction'

export interface IGetAllUserTransactions {
  getAll: () => Promise<ITransaction[]>
}
