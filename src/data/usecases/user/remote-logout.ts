import { UnexpectedError } from './../../../domain/errors/unexpected-error';
import { UserLogout } from './../../../domain/models/userLogout';
import { HttpClient, HttpStatusCode } from '../../protocols';
import { ILogout } from './../../../domain/usecases/interfaces/user/logout';
import { InvalidParamsError } from '../../../domain/errors';


export class RemoteLogout implements ILogout{

    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<void>,
      ) {}

    async logout(userLogout: UserLogout) {

        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'get',
            body: userLogout            
          });
          switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
              return httpResponse.body;
            case HttpStatusCode.badRequest:
              throw new InvalidParamsError(httpResponse.body?.message);
            default:
              throw new UnexpectedError();
          }

    }

}