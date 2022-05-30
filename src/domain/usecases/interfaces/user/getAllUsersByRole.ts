import { IUserPartialResponse } from "../../../../interfaces/api-response/userPartialResponse";
import { UserQueryRole } from "../../../models/userQueryRole";

export interface IGetAllUsersByRole {
    getAllByRole:(userQuery: UserQueryRole) => Promise<IUserPartialResponse[]>
}