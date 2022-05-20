import { FormCreateUser } from '../../../layout/components/forms/create-user';
import {makeRemoteGetAllUsers} from '../usecases/remote-getAllUsers-factory';
import { makeRemoteSignUp } from '../usecases/remote-signUp-factory';

export const MakeFormCreateUser = () => {
    return (<FormCreateUser signUp={makeRemoteSignUp()}/> );
  };
  