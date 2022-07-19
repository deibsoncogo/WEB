import { ICoupon } from '../../../domain/models/coupon'
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetCoupons } from '../../../domain/usecases/interfaces/coupon/getCoupons'

import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetCoupons implements IGetCoupons {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<ICoupon[]>) {}

  get = async () => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
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
