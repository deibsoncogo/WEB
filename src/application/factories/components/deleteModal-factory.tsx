import { IDeleteUserParams } from '../../../domain/usecases/interfaces/user/deleteUser'
import { Row } from '../../../layout/components/tables/users-list/row'

type IMakeUserRow = {
  id: string
  name: string
  email: string
  cpf: string
  birthDate: string
  address: string
  deleteUser: (params: IDeleteUserParams) => void
}

export function MakeUserRow({
  id,
  name,
  email,
  birthDate,
  cpf,
  address,
  deleteUser,
}: IMakeUserRow) {
  return (
    <Row
      id={id}
      name={name}
      email={email}
      birthDate={birthDate}
      cpf={cpf}
      address={address}
      deleteUser={deleteUser}
    />
  )
}
