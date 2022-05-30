import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { UserQueryRole } from '../../../domain/models/userQueryRole'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { IGetAllUsersByRole } from '../../../domain/usecases/interfaces/user/getAllUsersByRole'
import { IUserPartialResponse } from '../../../interfaces/api-response/userPartialResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllUsersByRole implements IGetAllUsersByRole {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IUserPartialResponse[]>
  ) {}

  async getAllByRole(userQuery: UserQueryRole) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${userQuery.role}`,
      method: 'get'
     
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
