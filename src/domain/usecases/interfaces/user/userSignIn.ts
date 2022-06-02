import { IAuthResponse } from '../../../../interfaces/api-response/authResponse';
import { UserSignIn } from '../../../models/userSignIn';

export interface IUserSignIn {
    signIn:(userSignIn: UserSignIn) => Promise<IAuthResponse>
}