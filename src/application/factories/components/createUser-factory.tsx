import { FormCreateUser } from '../../../layout/components/forms/create-user'
import { makeRemoteGetAllProducts } from '../usecases/remote-getAllProducts-factory'
import { makeRemoteSignUp } from '../usecases/remote-signUp-factory'

export const MakeFormCreateUser = () => {
  return (
    <FormCreateUser
      userRegister={makeRemoteSignUp()}
      getProducts={makeRemoteGetAllProducts()}
    />
  )
}
