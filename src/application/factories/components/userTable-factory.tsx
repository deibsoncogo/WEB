import UsersTable from '../../../layout/components/tables/users-list'
import { makeRemoteDeleteUser } from '../usecases/remote-deletUser-factory'
import { makeRemoteExportAllUsersToXLSX } from '../usecases/remote-exportAllUsersToXLSX-factory'
import { makeRemoteGetAllUsers } from '../usecases/remote-getAllUsers-factory'
import { makeRemoteResetUserPassword } from '../usecases/remote-resetUserPassword-factory'

export const MakeUserTable = () => {
  return (
    <UsersTable
      getAllUsers={makeRemoteGetAllUsers()}
      makeExportAllUserToXLSX={makeRemoteExportAllUsersToXLSX()}
      makeDeleteUser={makeRemoteDeleteUser()}
      makeResetPassword={makeRemoteResetUserPassword()}
    />
  )
}
