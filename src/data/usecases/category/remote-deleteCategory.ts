import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ConflitctEntitiesError } from '../../../domain/errors/conflict-entities-error'
import {
  DeleteCategoryParams,
  IDeleteCategory,
} from '../../../domain/usecases/interfaces/category/deleteCategory'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeleteCategory implements IDeleteCategory {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  delete = async (params: DeleteCategoryParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'delete',
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.conflict:
        throw new ConflitctEntitiesError(['Existem produtos vinculados a essa categoria.'])
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(['Categoria não encontrada'])
      default:
        throw new UnexpectedError()
    }
  }
}
