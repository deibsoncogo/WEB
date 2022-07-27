import { FormCreateUser } from '../../../layout/components/forms/user/create-user'
import { makeRemoteGetAllProducts } from '../usecases/product/remote-getAllProducts-factory'
import { makeRemoteVerifyCPF } from '../usecases/remote-getVerifyUserCPF'
import { makeRemoteVerifyEmail } from '../usecases/remote-getVerifyUserEmail'
import { makeRemoteSignUp } from '../usecases/remote-signUp-factory'

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
