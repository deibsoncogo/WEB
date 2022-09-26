import { HttpClient, HttpStatusCode } from '../../protocols'
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IDisableCoupon, IDisableCouponParams } from '../../../domain/usecases/interfaces/coupon/disableCoupon'

export class RemoteDisableCoupon implements IDisableCoupon {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  disable = async (params: IDisableCouponParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'patch',
      body: params
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
