import { AccessDeniedError, UnexpectedError } from '../../../domain/errors'
import { IGetZoomUsers, IZoomUser } from '../../../domain/usecases/interfaces/zoom/getZoomUsers'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetZoomUsers implements IGetZoomUsers {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<IZoomUser[]>) {}

  get = async () => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new AccessDeniedError('Acesso negado! Você não tem permissão para acessar o sistema.')
      default:
        throw new UnexpectedError()
    }
  }
}
