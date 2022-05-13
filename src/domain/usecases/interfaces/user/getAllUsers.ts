import { IUserResponse } from "../../../../interfaces/forms/api-response";

export interface IGetAllUsers {
    getAll:() => Promise<IUserResponse[]>
}