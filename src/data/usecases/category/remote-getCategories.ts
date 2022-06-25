import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import {
  GetCategoriesParams,
  IGetCategories,
} from '../../../domain/usecases/interfaces/category/getCategories'
import { Category } from '../../../interfaces/model/Category'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetCategories implements IGetCategories {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputPagination<Category>>
  ) {}

  get = async (params: GetCategoriesParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: params,
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
