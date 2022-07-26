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
  handleRefresher: () => void
  handleToggleStatusConfirmation: (trainingId: string) => void
  isAdmin: boolean
}

export function MakeTrainingsRow({
  id,
  name,
  description,
  price,
  teacher,
  belongsToPlans,
  isActive,
  handleRefresher,
  handleToggleStatusConfirmation,
  isAdmin
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
      handleRefresher={handleRefresher}
      handleToggleStatusConfirmation={handleToggleStatusConfirmation}
      isAdmin={isAdmin}
    />
  )
}
