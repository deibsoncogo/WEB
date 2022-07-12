import { FormCreateUser } from '../../../layout/components/forms/user/create-user'

import { makeRemoteSignUp } from '../usecases/remote-signUp-factory'
import { makeRemoteVerifyEmail } from '../usecases/remote-getVerifyUserEmail'
import { makeRemoteVerifyCPF } from '../usecases/remote-getVerifyUserCPF'

export const MakeFormCreateUser = () => {
  return <FormCreateUser userRegister={makeRemoteSignUp()} verifyEmail={makeRemoteVerifyEmail()}
  isCPFAlreadyRegistered={makeRemoteVerifyCPF()}  />
}
