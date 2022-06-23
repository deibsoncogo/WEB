import { CreateTrainingPageTemplate } from '../../../../layout/templates/trainings/createTraining'
import { makeRemoteGetCategories } from '../../usecases/categories/remote-getCategories-factory'
import { makeRemoteGetAllUsers } from '../../usecases/remote-getAllUsers-factory'
import { makeRemoteCreateTreaning } from '../../usecases/trainings/remote-createTraining-factory'
import { makeRemoteGetZoomUsers } from '../../usecases/zoom/remote-getZoomUsers-factory'

export const MakeCreateTrainingPage = () => {
  return (
    <CreateTrainingPageTemplate
      remoteGetTeachers={makeRemoteGetAllUsers()}
      remoteGetCategories={makeRemoteGetCategories()}
      remoteCreateTraining={makeRemoteCreateTreaning()}
      remoteGetZoomUsers={makeRemoteGetZoomUsers()}
    />
  )
}
