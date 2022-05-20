import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  CreateCategoryParams,
  ICreateCategory,
} from '../../../domain/usecases/interfaces/category/createCategory'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { keys } from '../../../helpers/KeyConstants'
import { IUserResponse } from '../../../interfaces/api-response'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteCreateCategory implements ICreateCategory {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  create = async (params: CreateCategoryParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(['Categoria já cadastrada'])
      default:
        throw new UnexpectedError()
    }
  }
}
