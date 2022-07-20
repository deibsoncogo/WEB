import { INotification } from './../../../domain/models/notification';
import { IUpdateNotification } from './../../../domain/usecases/interfaces/notification/updateNotification';
import { InvalidParamsError, UnexpectedError } from "../../../domain/errors"
import { HttpClient, HttpStatusCode } from "../../protocols"



export class RemoteUpdateNotification implements IUpdateNotification {
    
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

    async update (updateNotification: INotification){
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'put',
            body: updateNotification,
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

  

