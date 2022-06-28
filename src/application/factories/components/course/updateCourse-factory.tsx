import { FormUpdateCourse } from "../../../../layout/components/forms/course/edit/edit";
import { makeRemoteGetCategories } from "../../usecases/categories/remote-getCategories-factory";
import { makeRemoteGetCourse } from "../../usecases/course/remote-getCourse-factory";
import { makeRemoteUpdateCourse } from "../../usecases/course/remote-updateCourse-factory";
import { makeRemoteGetAllAttachmentByCourseId } from "../../usecases/courseAttachment/remote-getAllAttachmentByCourseId-factory";
import { makeRemoteGetAllCourseClassByCourseId } from "../../usecases/courseClass/remote-getAllCourseClassByCourseId-factory";
import { makeRemoteGetAllUsers } from "../../usecases/remote-getAllUsers-factory";


interface param {
  id: string | string[] | undefined
}

export const MakeFormUpdateCourse= (query: param) => {
    return (<FormUpdateCourse updateCourse={makeRemoteUpdateCourse()} 
     getCategories = {makeRemoteGetCategories()}
     getUsers = {makeRemoteGetAllUsers()}
     getAttachments = {makeRemoteGetAllAttachmentByCourseId()}
     getCourseClass = {makeRemoteGetAllCourseClassByCourseId()}
     id = {query.id}
     getCourse = {makeRemoteGetCourse()}           
     /> );
  };
  
