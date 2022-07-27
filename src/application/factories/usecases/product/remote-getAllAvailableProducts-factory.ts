import { RemoteGetAllProducts } from '../../../../data/usecases/product/remote-getAllProducts'
import { IGetAllProducts } from '../../../../domain/usecases/interfaces/product/getAllProducts'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetAllAvailableProducts = (): IGetAllProducts =>
  new RemoteGetAllProducts(makeApiUrl('/product/available'), makeAxiosHttpClient())
