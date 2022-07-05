import { Row } from '../../../../layout/components/tables/trainings-list/row'
import { makeRemoteDeleteTrainings } from '../../usecases/trainings/remote-deleteTrainings-factory'
import { makeRemoteToggleTrainingStatus } from '../../usecases/trainings/remote-toggleTrainingStatus-factory'
import { makeRemoteUpdateTraining } from '../../usecases/trainings/remote-updateTrainings'

type IMakeTrainingsRow = {
  id: string
  name: string
  active: boolean
  description: string
  price: string | number
  teacher: { name: string }
  getTrainings(): Promise<void>
  handleToggleStatusConfirmation: (trainingId: string) => void
}

export function MakeTrainingsRow({
  id,
  name,
  description,
  price,
  teacher,
  active,
  getTrainings,
  handleToggleStatusConfirmation,
}: IMakeTrainingsRow) {
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
      handleToggleStatusConfirmation={handleToggleStatusConfirmation}
    />
  )
}
