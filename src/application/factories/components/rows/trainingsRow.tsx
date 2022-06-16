import { Row } from '../../../../layout/components/tables/trainings-list/row'
import { makeRemoteUpdateTraining } from '../../usecases/trainings/remote-updateTrainings'
import { makeRemoteDeleteTrainings } from '../../usecases/trainings/remote-deleteTrainings-factory copy'

type MakeTrainingsRow = {
  id: string
  name: string
  description: string
  price: string | number
  teacher: { name: string }
  active: boolean
  getTrainings(): Promise<void>
  handleRefresher: () => void
}

export function MakeTrainingsRow({
  id,
  name,
  description,
  price,
  teacher,
  active,
  getTrainings,
  handleRefresher,
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
      updateStatusOfTraining={makeRemoteUpdateTraining()}
      getTrainings={getTrainings}
      handleRefresher={handleRefresher}
    />
  )
}
