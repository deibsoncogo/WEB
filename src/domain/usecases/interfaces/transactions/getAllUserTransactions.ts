import { ITransaction } from '../../../models/transaction'

export interface IGetAllUserTransactions {
  getAll: (id: string) => Promise<ITransaction[]>
}
