import { ICoupon } from '../../../domain/models/coupon'
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  IGetCoupons,
  IGetCouponsParams,
} from '../../../domain/usecases/interfaces/coupon/getCoupons'

import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetCoupons implements IGetCoupons {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<ICoupon[]>) {}

  get = async (params: IGetCouponsParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: params,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
