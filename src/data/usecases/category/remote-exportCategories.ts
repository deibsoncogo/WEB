import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IExportCategories } from '../../../domain/usecases/interfaces/category/exportCategories'
import { Category } from '../../../interfaces/model/Category'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteExportCategories implements IExportCategories {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<Category[]>) {}

  export = async () => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      responseType: 'blob',
    })

    console.log(httpResponse)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.response as any
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
