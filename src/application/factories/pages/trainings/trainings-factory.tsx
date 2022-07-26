import { TrainingsTemplate } from '../../../../layout/templates/trainings'
import { makeRemoteGetAllTeacherTrainings } from '../../usecases/trainings/remote-getAllTeacherTrainingsfactory'
import { makeRemoteGetAllTrainings } from '../../usecases/trainings/remote-getAllUsers-factory'
import { makeRemoteToggleTrainingStatus } from '../../usecases/trainings/remote-toggleTrainingStatus-factory'

export const MakeTrainingsPage = () => {
  return (
    <TrainingsTemplate
      remoteGetAllTrainings={makeRemoteGetAllTrainings()}
      remoteGetAllTeacherTrainings={makeRemoteGetAllTeacherTrainings()}
      remoteToggleTrainingStatus={makeRemoteToggleTrainingStatus()}
    />
  )
}
