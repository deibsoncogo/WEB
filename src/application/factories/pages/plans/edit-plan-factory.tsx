import { EditPlanPageTemplate } from '../../../../layout/templates/plans/editPlan'
import { makeRemoteGetAllBooks } from '../../usecases/book/remote-getAllBooks-factory'
import { makeRemoteGetCategoriesNoPagination } from '../../usecases/categories/remote-getCategoriesNoPagination-factory'
import { makeRemoteGetAllCourses } from '../../usecases/course/remote-getAllCourses-factory'
import { makeRemoteEditPlan } from '../../usecases/plans/remote-editPlan-factory'
import { makeRemoteGetPlan } from '../../usecases/plans/remote-getPlan-factory'
import { makeRemoteGetAllRooms } from '../../usecases/room/remote-getAllRooms-factory'
import { makeRemoteGetAllTrainings } from '../../usecases/trainings/remote-getAllUsers-factory'

export const MakeEditPlanPageTemplate = () => {
  return (
    <EditPlanPageTemplate
      remoteGetCourses={makeRemoteGetAllCourses()}
      remoteGetTrainings={makeRemoteGetAllTrainings()}
      remoteGetBooks={makeRemoteGetAllBooks()}
      remoteGetRooms={makeRemoteGetAllRooms()}
      remoteGetPlan={makeRemoteGetPlan()}
      remoteEditPlan={makeRemoteEditPlan()}
      remoteGetCategoriesNoPagination={makeRemoteGetCategoriesNoPagination()}
    />
  )
}
