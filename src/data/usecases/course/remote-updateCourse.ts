import { InvalidParamsError, UnexpectedError } from "../../../domain/errors"
import { UpdateCourse } from "../../../domain/models/updateCourse"
import { IUpdateCourse } from "../../../domain/usecases/interfaces/course/upDateCourse"
import { HttpClient, HttpStatusCode } from "../../protocols"



export class RemoteUpdateCourse implements IUpdateCourse {
    
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

    async update (updateCourse: UpdateCourse){
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'put',
            body: updateCourse,
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

  

