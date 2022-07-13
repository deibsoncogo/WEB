import { FormEditUser } from '../../../layout/components/forms/edit-user'
import { makeRemoteGetAllProducts } from '../usecases/remote-getAllProducts-factory'
import { makeRemoteGetUser } from '../usecases/remote-getUser-factory'
import { makeRemoteUpdateUser } from '../usecases/remote-updateUser-factory'

interface IMakeFormUpdateUser {
  id: string
}

export const MakeFormUpdateUser = ({ id }: IMakeFormUpdateUser) => {
  return (
    <FormEditUser
      id={id}
      userRegister={makeRemoteUpdateUser()}
      getUser={makeRemoteGetUser(id)}
      getProducts={makeRemoteGetAllProducts()}
    />
  )
}
