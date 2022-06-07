import { Row } from '../../../../layout/components/tables/trainings-list/row'
import { makeRemoteDeleteTrainings } from '../../usecases/trainings/remote-deleteTrainings-factory copy'

type MakeTrainingsRow = {
  id: string
  name: string
  description: string
  price: string | number
  teacher: { name: string }
  getTrainings(): Promise<void>
}

export function MakeTrainingsRow({ id, name, description, price, teacher, getTrainings }: MakeTrainingsRow) {
  return (
    <Row
      id={id}
      name={name}
      description={description}
      price={price}
      teacherName={teacher.name}
      deleteTraining={makeRemoteDeleteTrainings(id)}
      getTrainings={getTrainings}
    />
  )
}
