import { InvalidParamsError, UnexpectedError } from "../../../domain/errors"
import { IGetAllAttachmentByCourseId } from "../../../domain/usecases/interfaces/courseAttachment/getAllAttachmentByCourseId"
import { ICourseAttachmentResponse } from "../../../interfaces/api-response/courseAttachmentResponse"
import { HttpClient, HttpStatusCode } from "../../protocols"

export class RemoteGetAllAttachmentCourseByCourseId implements IGetAllAttachmentByCourseId{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ICourseAttachmentResponse[]>
  ) {}

  async getAllByCourseId(courseId: string) {
    
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${courseId}`,
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
