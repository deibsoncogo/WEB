import { CreatePlanPageTemplate } from '../../../../layout/templates/plans/createPlan'
import { makeRemoteGetAllBooks } from '../../usecases/book/remote-getAllBooks-factory'
import { makeRemoteGetAllCourses } from '../../usecases/course/remote-getAllCourses-factory'
import { makeRemoteCreatePlan } from '../../usecases/plans/remote-createPlan-factory'
import { makeRemoteGetPlans } from '../../usecases/plans/remote-getPlans-factory'
import { makeRemoteGetAllRooms } from '../../usecases/room/remote-getAllRooms-factory'
import { makeRemoteGetAllTrainings } from '../../usecases/trainings/remote-getAllUsers-factory'

export const MakeCreatePlanPageTemplate = () => {
  return (
    <CreatePlanPageTemplate
      remoteGetCourses={makeRemoteGetAllCourses()}
      remoteGetTrainings={makeRemoteGetAllTrainings()}
      remoteGetBooks={makeRemoteGetAllBooks()}
      remoteGetRooms={makeRemoteGetAllRooms()}
      remoteGetPlans={makeRemoteGetPlans()}
      remoteCreatePlan={makeRemoteCreatePlan()}
    />
  )
}
