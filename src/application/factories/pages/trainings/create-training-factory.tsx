import { CreateTrainingPageTemplate } from '../../../../layout/templates/trainings/createTraining'
import { makeRemoteGetCategoriesNoPagination } from '../../usecases/categories/remote-getCategoriesNoPagination-factory'
import { makeRemoteGetAllUsers } from '../../usecases/remote-getAllUsers-factory'
import { makeRemoteCreateTreaning } from '../../usecases/trainings/remote-createTraining-factory'
import { makeRemoteGetZoomUsers } from '../../usecases/zoom/remote-getZoomUsers-factory'

export const MakeCreateTrainingPage = () => {
  return (
    <CreateTrainingPageTemplate
      remoteGetTeachers={makeRemoteGetAllUsers()}
      remoteGetCategoriesNoPagination={makeRemoteGetCategoriesNoPagination()}
      remoteCreateTraining={makeRemoteCreateTreaning()}
      remoteGetZoomUsers={makeRemoteGetZoomUsers()}
    />
  )
}
