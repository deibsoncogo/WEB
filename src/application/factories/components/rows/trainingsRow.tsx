import { Row } from '../../../../layout/components/tables/trainings-list/row'
import { makeRemoteDeleteTrainings } from '../../usecases/trainings/remote-deleteTrainings-factory'
import { makeRemoteToggleTrainingStatus } from '../../usecases/trainings/remote-toggleTrainingStatus-factory'

type MakeTrainingsRow = {
  id: string
  name: string
  active: boolean
  description: string
  price: string | number
  teacher: { name: string }
  getTrainings(): Promise<void>
}

export function MakeTrainingsRow({
  id,
  name,
  description,
  price,
  teacher,
  active,
  getTrainings,
}: MakeTrainingsRow) {
  return (
    <Row
      id={id}
      name={name}
      description={description}
      price={price}
      teacherName={teacher.name}
      active={active}
      deleteTraining={makeRemoteDeleteTrainings(id)}
      getTrainings={getTrainings}
      remoteToggleTrainingStatus={makeRemoteToggleTrainingStatus()}
    />
  )
}
