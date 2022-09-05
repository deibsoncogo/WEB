import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IChatRoom } from '../../../domain/models/createChatRoom'
import {
  IJoinTrainingChatRoom,
  IJoinTrainingChatRoomParams,
} from '../../../domain/usecases/interfaces/chatTraining/joinTrainingChatRoom'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteJoinTrainingChatRoom implements IJoinTrainingChatRoom {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<IChatRoom[]>) {}

  join = async (query: IJoinTrainingChatRoomParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${query.trainingId}`,
      method: 'post',
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.body.accessToken
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
