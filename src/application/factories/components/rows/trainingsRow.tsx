import { Row } from '../../../../layout/components/tables/trainings-list/row'
import { makeRemoteDeleteTrainings } from '../../usecases/trainings/remote-deleteTrainings-factory'

type IMakeTrainingsRow = {
  id: string
  name: string
  belongsToPlans: boolean
  isActive: boolean
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
  belongsToPlans,
  isActive,
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
      belongsToPlans={belongsToPlans}
      isActive={isActive}
      deleteTraining={makeRemoteDeleteTrainings(id)}
      getTrainings={getTrainings}
      handleToggleStatusConfirmation={handleToggleStatusConfirmation}
    />
  )
}
