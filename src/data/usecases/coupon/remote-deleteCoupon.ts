import { HttpClient, HttpStatusCode } from '../../protocols'
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ConflitctEntitiesError } from '../../../domain/errors/conflict-entities-error'
import { IDeleteCouponParams, IDeleteCoupon } from '../../../domain/usecases/interfaces/coupon'

export class RemoteDeleteCoupon implements IDeleteCoupon {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  delete = async (params: IDeleteCouponParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'delete',
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.conflict:
        throw new ConflitctEntitiesError(['Existem produtos vinculados a esse cupom.'])
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(['Cupom não encontrado'])
      default:
        throw new UnexpectedError()
    }
  }
}
