import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  IToggleBookStatus,
  IToggleBookStatusParams,
} from '../../../domain/usecases/interfaces/book/toggleBookStatus'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteToggleBookStatus implements IToggleBookStatus {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  toggle = async (params: IToggleBookStatusParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'patch',
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        if (
          httpResponse.body.message.includes('must have stock greather than 0 to be a activeted.')
        ) {
          throw new InvalidParamsError(
            'Para ativar o status do livro seu estoque deve ser maior que zero.'
          )
        }
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
