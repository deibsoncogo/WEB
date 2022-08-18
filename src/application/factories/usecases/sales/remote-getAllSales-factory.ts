import { RemoteGetAllSales } from './../../../../data/usecases/sale/remote-getAllSales';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';
import { IGetAllSales } from '../../../../domain/usecases/interfaces/sale/getAllSales';


export const makeRemoteGetAllSales = (): IGetAllSales =>
  new RemoteGetAllSales(makeApiUrl('transaction'), makeAxiosHttpClient());
