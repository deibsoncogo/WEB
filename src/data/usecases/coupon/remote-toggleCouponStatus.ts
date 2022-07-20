import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  IToggleCouponStatus,
  IToggleCouponStatusParams,
} from '../../../domain/usecases/interfaces/coupon/toggleCouponStatus'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteToggleCouponStatus implements IToggleCouponStatus {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  toggle = async (params: IToggleCouponStatusParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'patch',
      body: params,
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
