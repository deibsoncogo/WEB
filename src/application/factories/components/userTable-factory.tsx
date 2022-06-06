import UsersTable from '../../../layout/components/tables/users-list'
import { makeRemoteDeleteUser } from '../usecases/remote-deletUser-factory'
import { makeRemoteExportAllUsersToXLSX } from '../usecases/remote-exportAllUsersToXLSX-factory'
import { makeRemoteGetAllUsers } from '../usecases/remote-getAllUsers-factory'

export const MakeUserTable = () => {
  return (
    <UsersTable
      getAllUsers={makeRemoteGetAllUsers()}
      makeExportAllUserToXLSX={makeRemoteExportAllUsersToXLSX()}
      makeDeleteUser={makeRemoteDeleteUser()}
    />
  )
}
