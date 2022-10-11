import { CreateFreePlanPageTemplate } from '../../../../layout/templates/freePlans/createFreePlan'
import { makeRemoteGetAllBooks } from '../../usecases/book/remote-getAllBooks-factory'
import { makeRemoteGetAllCourses } from '../../usecases/course/remote-getAllCourses-factory'
import { makeRemoteCreatePlan } from '../../usecases/plans/remote-createPlan-factory'
import { makeRemoteGetAllRooms } from '../../usecases/room/remote-getAllRooms-factory'
import { makeRemoteGetAllTrainings } from '../../usecases/trainings/remote-getAllUsers-factory'

export const MakeCreateFreePlanPageTemplate = () => {
  return (
    <CreateFreePlanPageTemplate
      remoteGetCourses={makeRemoteGetAllCourses()}
      remoteGetTrainings={makeRemoteGetAllTrainings()}
      remoteGetBooks={makeRemoteGetAllBooks()}
      remoteGetRooms={makeRemoteGetAllRooms()}
      remoteCreateFreePlan={makeRemoteCreatePlan()}
    />
  )
}
