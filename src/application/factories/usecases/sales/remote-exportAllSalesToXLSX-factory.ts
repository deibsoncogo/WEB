import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { RemoteExportAllSalesToXLSX } from "../../../../data/usecases/sale/remote-exportAllSalesToXLSX";
import { IExportAllSalesToXLSX } from "../../../../domain/usecases/interfaces/sale/exportAllSalesToXLSX";
import { makeApiUrl } from "../../http";

export const makeRemoteExportAllSalesToXLSX = (): IExportAllSalesToXLSX =>
  new RemoteExportAllSalesToXLSX(makeApiUrl('transaction/export'), makeAxiosHttpClient())
