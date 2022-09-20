import { ISalesResponse } from '../../../../interfaces/api-response/salesResponse'

export interface IGetSale {
  get: (id: string) => Promise<ISalesResponse>
}
