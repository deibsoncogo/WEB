import { CreateTrainingPageTemplate } from '../../../../layout/templates/trainings/createTraining'
import { makeRemoteGetCategories } from '../../usecases/categories/remote-getCategories-factory'
import { makeRemoteGetAllUsers } from '../../usecases/remote-getAllUsers-factory'

export const MakeCreateTrainingPage = () => {
  return (
    <CreateTrainingPageTemplate
      makeGetTeachers={makeRemoteGetAllUsers()}
      remoteGetCategories={makeRemoteGetCategories()}
    />
  )
}
