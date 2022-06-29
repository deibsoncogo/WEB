import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ConflitctEntitiesError } from '../../../domain/errors/conflict-entities-error'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeleteTraining implements IDeleteTraining {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  deleteTraining = async () => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
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
