import { InvalidParamsError } from './../../../domain/errors/invalid-params-error';
import { IFreeContentResponse } from './../../../interfaces/api-response/freeContentResponse';
import { IGetFreeContent } from './../../../domain/usecases/interfaces/freeContent/getFreeContent';
import { HttpClient, HttpStatusCode } from '../../protocols';
import { UnexpectedError } from '../../../domain/errors';


export class RemoteGetFreeContent implements IGetFreeContent {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IFreeContentResponse>
  ) {}

  async get(id: string) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
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
