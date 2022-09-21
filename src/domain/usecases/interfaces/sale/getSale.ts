import { ISaleInformation } from '../../../../interfaces/api-response/saleInformations'

export interface IGetSale {
  get: (id: string) => Promise<ISaleInformation>
}
