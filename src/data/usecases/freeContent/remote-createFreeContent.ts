import { ICreateFreeContent } from './../../../domain/usecases/interfaces/freeContent/createFreeContent';
import { InvalidParamsError, UnexpectedError } from "../../../domain/errors"
import { getAuthHeadersMultipart } from "../../../helpers/axios/axiosHeaderMultipart"
import { HttpClient, HttpStatusCode } from "../../protocols"


export class RemoteCreateFreeContent implements ICreateFreeContent {
    
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

    async create (createFreeContent: FormData){
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: createFreeContent,
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

  

