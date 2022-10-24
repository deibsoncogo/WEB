import { ITransaction } from '../../../models/transaction'
import { ITransactionPagarMe } from '../../../models/transactionPagarMe'

export interface IGetTransactionById {
  get: () => Promise<ITransactionPagarMe>
}
