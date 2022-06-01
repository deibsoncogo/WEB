import { IUserResponse } from "../../../../interfaces/api-response";

export interface IGetUser {
    getOne:() => Promise<IUserResponse>
}
