
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetCategoriesNoPagination } from '../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { Category } from '../../../interfaces/model/Category'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetCategoriesNoPagination implements IGetCategoriesNoPagination {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<Category[]>) {}

  get = async (name: string) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: {name}
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
