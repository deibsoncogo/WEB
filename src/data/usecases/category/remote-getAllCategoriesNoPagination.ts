
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { GetCategoriesNoPaginationParams, IGetCategoriesNoPagination } from '../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { Category } from '../../../interfaces/model/Category'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetCategoriesNoPagination implements IGetCategoriesNoPagination {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<Category[]>) {}

  get = async (params: GetCategoriesNoPaginationParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: params
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
