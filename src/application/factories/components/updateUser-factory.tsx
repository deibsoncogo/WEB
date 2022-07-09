
import { FormEditUser } from '../../../layout/components/forms/user/edit-user'
import { makeRemoteGetUser } from '../usecases/remote-getUser-factory'
import { makeRemoteVerifyCPF } from '../usecases/remote-getVerifyUserCPF'
import { makeRemoteUpdateUser } from '../usecases/remote-updateUser-factory'

interface IMakeFormUpdateUser {
  id: string
}

export const MakeFormUpdateUser = ({ id }: IMakeFormUpdateUser) => {
  return <FormEditUser id={id} userRegister={makeRemoteUpdateUser()} getUser={makeRemoteGetUser(id)} isCPFAlreadyRegistered={makeRemoteVerifyCPF()}/>
}
