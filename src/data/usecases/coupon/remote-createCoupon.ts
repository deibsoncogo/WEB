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
        const isValueProductError = String(httpResponse.body.message).includes(
          'has a value less than the discount'
        )

        if (isValueProductError) {
          throw new InvalidParamsError([
            `O produto "${httpResponse.body.extraInfo}" tem o valor menor que o valor do desconto`,
          ])
        }
        throw new InvalidParamsError(['Cupom já cadastrado'])
      default:
        throw new UnexpectedError()
    }
  }
}
