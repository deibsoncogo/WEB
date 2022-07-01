import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IChatTraining } from '../../../domain/models/createChatTraining'
import { ICreateChatTraining } from '../../../domain/usecases/interfaces/chatTraining/createTraining'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteCreateChatTraining implements ICreateChatTraining {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

  async create(chatTraining: IChatTraining) {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: chatTraining,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return true
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
