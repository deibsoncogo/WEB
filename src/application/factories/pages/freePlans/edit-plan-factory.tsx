import { EditFreePlanPageTemplate } from '../../../../layout/templates/freePlans/editPlan'
import { makeRemoteGetAllBooks } from '../../usecases/book/remote-getAllBooks-factory'
import { makeRemoteGetAllCourses } from '../../usecases/course/remote-getAllCourses-factory'
import { makeRemoteEditPlan } from '../../usecases/plans/remote-editPlan-factory'
import { makeRemoteGetPlan } from '../../usecases/plans/remote-getPlan-factory'
import { makeRemoteGetAllRooms } from '../../usecases/room/remote-getAllRooms-factory'
import { makeRemoteGetAllTrainings } from '../../usecases/trainings/remote-getAllUsers-factory'

export const MakeEditFreePlanPageTemplate = () => {
  return (
    <EditFreePlanPageTemplate
      remoteGetCourses={makeRemoteGetAllCourses()}
      remoteGetTrainings={makeRemoteGetAllTrainings()}
      remoteGetBooks={makeRemoteGetAllBooks()}
      remoteGetRooms={makeRemoteGetAllRooms()}
      remoteGetPlan={makeRemoteGetPlan()}
      remoteEditPlan={makeRemoteEditPlan()}
    />
  )
}
