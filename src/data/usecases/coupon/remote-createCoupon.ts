import { HttpClient, HttpStatusCode } from '../../protocols'
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { CreateCouponParams, ICreateCoupon } from '../../../domain/usecases/interfaces/coupon'

export class RemoteCreateCoupon implements ICreateCoupon {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  create = async (params: CreateCouponParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(['Cupom já cadastrado'])
      default:
        throw new UnexpectedError()
    }
  }
}
