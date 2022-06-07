import { TrainingsTemplate } from '../../../../layout/templates/trainings'
import { makeRemoteGetAllTrainings } from '../../usecases/trainings/remote-getAllUsers-factory'

export const MakeTrainingsPage = () => {
  return <TrainingsTemplate remoteGetAllTrainings={makeRemoteGetAllTrainings()} />
}
