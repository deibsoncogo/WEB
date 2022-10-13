import { InvalidParamsError } from '../../../domain/errors'
import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import { IUploadFileChatTraining } from '../../../domain/usecases/interfaces/chatTraining/uploadFileChatTraining'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteUploadFileChatTraining implements IUploadFileChatTraining {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  upload = async (data: FormData) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
