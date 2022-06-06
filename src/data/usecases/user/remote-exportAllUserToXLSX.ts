import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  IExportAllUsersParams,
  IExportAllUsersToXLSX,
} from '../../../domain/usecases/interfaces/user/exportAllUsersToXLSX'
import { IUserResponse } from '../../../interfaces/api-response'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteExportAllUserToXLSX implements IExportAllUsersToXLSX {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IUserResponse[]>
  ) {}

  export = async (params: IExportAllUsersParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: params,
      responseType: 'blob',
    })

    console.log(httpResponse)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          data: httpResponse.response.data,
          type: httpResponse?.response.data.type,
        }
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
