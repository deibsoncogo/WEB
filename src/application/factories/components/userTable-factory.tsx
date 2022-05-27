import BooksTable from '../../../layout/components/tables/books-list'

import { makeRemoteGetAllUsers } from '../usecases/remote-getAllUsers-factory'

export const MakeUserTable = () => {
  return <BooksTable getAllUsers={makeRemoteGetAllUsers()} />
}
