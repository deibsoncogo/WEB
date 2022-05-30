import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  CreateCategoryParams,
  ICreateCategory,
} from '../../../domain/usecases/interfaces/category/createCategory'
import {
  IUpdateCategory,
  UpdateCategoryParams,
} from '../../../domain/usecases/interfaces/category/updateCategory'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteUpdateCategory implements IUpdateCategory {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  update = async (params: UpdateCategoryParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(['Categoria já cadastrada'])
      default:
        throw new UnexpectedError()
    }
  }
}
