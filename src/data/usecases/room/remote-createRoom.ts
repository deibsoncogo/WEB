import { InvalidParamsError, UnexpectedError } from "../../../domain/errors"
import { ICreateRoom } from "../../../domain/usecases/interfaces/room/createRoom"
import { getAuthHeadersMultipart } from "../../../helpers/axios/axiosHeaderMultipart"
import { HttpClient, HttpStatusCode } from "../../protocols"


export class RemoteCreateRoom implements ICreateRoom {
    
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

    async create (createRoom: FormData){
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: createRoom,
            headers: getAuthHeadersMultipart()

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

  

