import { UserSignUp } from './../../../models/userSignUp';

export interface IUserSignUp {
    signUp:(userSignUp: UserSignUp) => Promise<boolean>
}