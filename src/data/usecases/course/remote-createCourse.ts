import { InvalidParamsError, UnexpectedError } from "../../../domain/errors"
import { CreateCourse } from "../../../domain/models/createCourse"
import { ICreateCourse } from "../../../domain/usecases/interfaces/course/createCourse"
import { HttpClient, HttpStatusCode } from "../../protocols"


export class RemoteCreateCourse implements ICreateCourse {
    
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

    async create (createCourse: CreateCourse){
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: createCourse,
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

  

