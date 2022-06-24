import { FormEditUser } from '../../../layout/components/forms/edit-user'
import { makeRemoteGetAllCourses } from '../usecases/course/remote-getAllCourses-factory'
import { makeRemoteGetAllPlans } from '../usecases/plans/remote-getAllPlans-factory'
import { makeRemoteGetUser } from '../usecases/remote-getUser-factory'
import { makeRemoteUpdateUser } from '../usecases/remote-updateUser-factory'
import { makeRemoteGetAllTrainings } from '../usecases/trainings/remote-getAllUsers-factory'

interface IMakeFormUpdateUser {
  id: string
}

export const MakeFormUpdateUser = ({ id }: IMakeFormUpdateUser) => {
  return (
    <FormEditUser
      id={id}
      userRegister={makeRemoteUpdateUser()}
      getUser={makeRemoteGetUser(id)}
      getCourses={makeRemoteGetAllCourses()}
      getPlans={makeRemoteGetAllPlans()}
      getTrainings={makeRemoteGetAllTrainings()}
    />
  )
}
