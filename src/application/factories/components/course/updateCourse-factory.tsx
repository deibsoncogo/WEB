import { FormUpdateCourse } from "../../../../layout/components/forms/course/edit";
import { makeRemoteGetCategoriesNoPagination } from "../../usecases/categories/remote-getCategoriesNoPagination-factory";
import { makeRemoteUpdateCourse } from "../../usecases/course/remote-updateCourse-factory";
import { makeRemoteGetAllUsersByRole } from "../../usecases/remote-getAllUsersByRole-factory";


export const MakeFormUpdateCourse= () => {
    return (<FormUpdateCourse updateCourse={makeRemoteUpdateCourse()} 
     getCategories = {makeRemoteGetCategoriesNoPagination()}
     getUsers = {makeRemoteGetAllUsersByRole()}/> );
  };
  