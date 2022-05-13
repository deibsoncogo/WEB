import { IUserResponse } from "../../../../interfaces/api-response";

export interface IGetAllUsers {
    getAll:() => Promise<IUserResponse[]>
}