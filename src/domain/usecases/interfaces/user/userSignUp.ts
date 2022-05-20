import { UserSignUp } from './../../../models/userSignUp';
import { IUserResponse } from "../../../../interfaces/api-response";

export interface IUserSignUp {
    signUp:(userSignUp: UserSignUp) => Promise<boolean>
}