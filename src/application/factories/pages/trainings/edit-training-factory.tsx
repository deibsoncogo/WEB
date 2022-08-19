import { EditTrainingPageTemplate } from '../../../../layout/templates/trainings/editTraining'
import { makeRemoteGetCategoriesNoPagination } from '../../usecases/categories/remote-getCategoriesNoPagination-factory'
import { makeRemoteGetAllUsers } from '../../usecases/remote-getAllUsers-factory'
import { makeRemoteEditTraining } from '../../usecases/trainings/remote-editTraining-factory'
import { makeRemoteGetTraining } from '../../usecases/trainings/remote-getTraining-factory'
import { makeRemoteGetZoomUsers } from '../../usecases/zoom/remote-getZoomUsers-factory'

export const MakeEditTraining = () => {
  return (
    <EditTrainingPageTemplate
      remoteGetTeachers={makeRemoteGetAllUsers()}
      remoteGetCategoriesNoPagination={makeRemoteGetCategoriesNoPagination()}
      remoteEditTraining={makeRemoteEditTraining()}
      remoteGetTraining={makeRemoteGetTraining()}
      remoteGetZoomUsers={makeRemoteGetZoomUsers()}
    />
  )
}
