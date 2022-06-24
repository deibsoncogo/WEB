import { FormLogin } from '../../../layout/components/forms/login'
import { makeRemoteSignIn } from '../usecases/remote-signIn-factory'

export const MakeFormSignInUser = () => {
  return <FormLogin userLogin={makeRemoteSignIn()} />
}
