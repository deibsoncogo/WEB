import { INotification } from './../../../domain/models/notification';
import { ICreateNotification } from './../../../domain/usecases/interfaces/notification/createNotification';
import { InvalidParamsError, UnexpectedError } from "../../../domain/errors"
import { HttpClient, HttpStatusCode } from "../../protocols"


export class RemoteCreateNotification implements ICreateNotification {
    
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

    async create (createNotification: INotification){
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: createNotification,          
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

  

