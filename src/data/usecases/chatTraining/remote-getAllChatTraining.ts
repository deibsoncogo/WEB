import { UnexpectedError } from './../../../domain/errors/unexpected-error';
import { InvalidParamsError } from "../../../domain/errors"
import { IChatTraining } from "../../../domain/models/createChatTraining"
import { GetChatTrainingParam, IGetAllChatTraining } from "../../../domain/usecases/interfaces/chatTraining/getAllChatRooms"
import { HttpClient, HttpStatusCode } from "../../protocols"

export class RemoteGetAllChatTraining implements IGetAllChatTraining {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IChatTraining[]>
  ) {}

  async getAll(query: GetChatTrainingParam) {    
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: query
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
