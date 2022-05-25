import { FormEditUser } from '../../../layout/components/forms/edit-user'
import { makeRemoteUpdateUser } from '../usecases/remote-updateUser-factory'

interface IMakeFormUpdateUser {
  id: string
}

export const MakeFormUpdateUser = ({ id }: IMakeFormUpdateUser) => {
  return <FormEditUser id={id} userRegister={makeRemoteUpdateUser()} />
}
