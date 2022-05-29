import { FormUpdateCourse } from "../../../../layout/components/forms/course/edit";
import { makeRemoteGetCategoriesNoPagination } from "../../usecases/categories/remote-getCategoriesNoPagination-factory";
import { makeRemoteGetCourse } from "../../usecases/course/remote-getCourse-factory";
import { makeRemoteUpdateCourse } from "../../usecases/course/remote-updateCourse-factory";
import { makeRemoteGetAllUsersByRole } from "../../usecases/remote-getAllUsersByRole-factory";

interface param {
    id: string| string[] | undefined
}

export const MakeFormUpdateCourse= (query: param) => {
    return (<FormUpdateCourse updateCourse={makeRemoteUpdateCourse()} 
     getCategories = {makeRemoteGetCategoriesNoPagination()}
     getUsers = {makeRemoteGetAllUsersByRole()}
     getCourse = {makeRemoteGetCourse(query.id)}     
     /> );
  };
  