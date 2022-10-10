import { RemoteGetSale } from '../../../../data/usecases/sale/remote-getSale'
import { IGetSale } from '../../../../domain/usecases/interfaces/sale/getSale'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetSale = (): IGetSale =>
  new RemoteGetSale(makeApiUrl('transaction'), makeAxiosHttpClient())
