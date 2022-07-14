import { FormCreateUser } from '../../../layout/components/forms/user/create-user'

import { makeRemoteSignUp } from '../usecases/remote-signUp-factory'
import { makeRemoteVerifyEmail } from '../usecases/remote-getVerifyUserEmail'
import { makeRemoteVerifyCPF } from '../usecases/remote-getVerifyUserCPF'
import { makeRemoteGetAllProducts } from '../usecases/remote-getAllProducts-factory'

export const MakeFormCreateUser = () => {
  return (
    <FormCreateUser
      userRegister={makeRemoteSignUp()}
      verifyEmail={makeRemoteVerifyEmail()}
      getProducts={makeRemoteGetAllProducts()}
      isCPFAlreadyRegistered={makeRemoteVerifyCPF()}
    />
  )
}
