import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ConflitctEntitiesError } from '../../../domain/errors/conflict-entities-error'
import { IDeleteUser, IDeleteUserParams } from '../../../domain/usecases/interfaces/user/deleteUser'
import { IUserResponse } from '../../../interfaces/api-response'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeleteUser implements IDeleteUser {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IUserResponse[]>
  ) {}

  deleteUser = async (params: IDeleteUserParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      params,
      method: 'delete',
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.conflict:
        throw new ConflitctEntitiesError([
          'Existem entidades deste usuário que precisam ser deletadas primeiro',
        ])
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
