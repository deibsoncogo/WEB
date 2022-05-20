import { FormCreateUser } from '../../../layout/components/forms/create-user';

import { makeRemoteSignUp } from '../usecases/remote-signUp-factory';

export const MakeFormCreateUser = () => {
    return (<FormCreateUser userRegister={makeRemoteSignUp()}/> );
  };
  