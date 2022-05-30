import { Row } from '../../../layout/components/tables/users-list/row'
import { makeRemoteDeleteUser } from '../usecases/remote-deletUser-factory'

type IMakeUserRow = {
  id: string
  name: string
  email: string
  cpf: string
  birthDate: string
  address: string
  refreshUsers: () => void
}

export function MakeUserRow({ id, name, email, birthDate, cpf, address, refreshUsers }: IMakeUserRow) {
  return (
    <Row
      id={id}
      name={name}
      email={email}
      birthDate={birthDate}
      cpf={cpf}
      address={address}
      deleteUser={makeRemoteDeleteUser(id)}
      refreshUsers={refreshUsers}
    />
  )
}
