import { IUpdateFreeContent } from './../../../domain/usecases/interfaces/freeContent/updateFreeContent';
import { InvalidParamsError, UnexpectedError } from "../../../domain/errors"
import { getAuthHeadersMultipart } from "../../../helpers/axios/axiosHeaderMultipart"
import { HttpClient, HttpStatusCode } from "../../protocols"



export class RemoteUpdateFreeContent implements IUpdateFreeContent {
    
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

    async update (updateFreeContent: FormData){
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'put',
            body: updateFreeContent,
            headers: getAuthHeadersMultipart()
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

  

