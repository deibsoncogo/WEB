import { FormCreateUser } from '../../../layout/components/forms/create-user'
import { makeRemoteGetAllCourses } from '../usecases/course/remote-getAllCourses-factory'
import { makeRemoteGetAllPlans } from '../usecases/plans/remote-getAllPlans-factory'

import { makeRemoteSignUp } from '../usecases/remote-signUp-factory'
import { makeRemoteGetAllTrainings } from '../usecases/trainings/remote-getAllUsers-factory'

export const MakeFormCreateUser = () => {
  return (
    <FormCreateUser
      userRegister={makeRemoteSignUp()}
      getCourses={makeRemoteGetAllCourses()}
      getPlans={makeRemoteGetAllPlans()}
      getTrainings={makeRemoteGetAllTrainings()}
    />
  )
}
