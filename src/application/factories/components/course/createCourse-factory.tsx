import { FormCreateCourse } from "../../../../layout/components/forms/course/create";
import { makeRemoteGetCategoriesNoPagination } from "../../usecases/categories/remote-getCategoriesNoPagination-factory";

import { makeRemoteCreateCourse } from "../../usecases/course/remote-signUp-factory";
import { makeRemoteGetAllUsersByRole } from "../../usecases/remote-getAllUsersByRole-factory";


export const MakeFormCreateCourse = () => {
    return (<FormCreateCourse createCourse={makeRemoteCreateCourse()} 
     getCategories = {makeRemoteGetCategoriesNoPagination()}
     getUsers = {makeRemoteGetAllUsersByRole()}/> );
  };
  