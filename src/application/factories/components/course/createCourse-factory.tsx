import { FormCreateCourse } from "../../../../layout/components/forms/course/create";
import { makeRemoteCreateCourse } from "../../usecases/course/remote-signUp-factory";


export const MakeFormCreateCourse = () => {
    return (<FormCreateCourse createCourse={makeRemoteCreateCourse()}/> );
  };
  