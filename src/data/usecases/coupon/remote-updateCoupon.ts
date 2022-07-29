import { HttpClient, HttpStatusCode } from '../../protocols'
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IUpdateCoupon, UpdateCouponParams } from '../../../domain/usecases/interfaces/coupon'

export class RemoteUpdateCoupon implements IUpdateCoupon {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  update = async (params: UpdateCouponParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        const isValueProductError = String(httpResponse.body.message).includes(
          'has a value less than the discount'
        )

        if (isValueProductError) {
          throw new InvalidParamsError([
            `product value less than discount: (${httpResponse.body.extraInfo})`,
          ])
        }
        throw new InvalidParamsError(['Cupom já cadastrado'])
      default:
        throw new UnexpectedError()
    }
  }
}
