import { FormEditUser } from '../../../layout/components/forms/user/edit-user'
import { makeRemoteGetAllProducts } from '../usecases/product/remote-getAllProducts-factory'
import { makeRemoteGetUser } from '../usecases/remote-getUser-factory'
import { makeRemoteVerifyCPF } from '../usecases/remote-getVerifyUserCPF'
import { makeRemoteUpdateUser } from '../usecases/remote-updateUser-factory'
import { makeRemoteGetAllUserTransactions } from '../usecases/transactions/remote-getAllUserTransactions-factory'

interface IMakeFormUpdateUser {
  id: string
}

export const MakeFormUpdateUser = ({ id }: IMakeFormUpdateUser) => {
  return (
    <FormEditUser
      id={id}
      userRegister={makeRemoteUpdateUser()}
      getUser={makeRemoteGetUser(id)}
      isCPFAlreadyRegistered={makeRemoteVerifyCPF()}
      getProducts={makeRemoteGetAllProducts()}
      remoteGetAllUserTransactions={makeRemoteGetAllUserTransactions()}
    />
  )
}
