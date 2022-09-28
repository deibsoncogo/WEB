import { HttpClient, HttpStatusCode } from '../../protocols'
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IDeleteCoupon, IDeleteCouponParams } from '../../../domain/usecases/interfaces/coupon/deleteCoupon'

export class RemoteDeleteCoupon implements IDeleteCoupon {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  delete = async (params: IDeleteCouponParams) => {
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
