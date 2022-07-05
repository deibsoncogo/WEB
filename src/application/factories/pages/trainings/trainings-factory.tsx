import { TrainingsTemplate } from '../../../../layout/templates/trainings'
import { makeRemoteGetAllTrainings } from '../../usecases/trainings/remote-getAllUsers-factory'
import { makeRemoteToggleTrainingStatus } from '../../usecases/trainings/remote-toggleTrainingStatus-factory'

export const MakeTrainingsPage = () => {
  return (
    <TrainingsTemplate
      remoteGetAllTrainings={makeRemoteGetAllTrainings()}
      remoteToggleTrainingStatus={makeRemoteToggleTrainingStatus()}
    />
  )
}
