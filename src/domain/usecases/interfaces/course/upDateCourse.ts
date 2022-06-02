import { UpdateCourse } from "../../../models/updateCourse";


export interface IUpdateCourse {
    update:(updateCourse: UpdateCourse) => Promise<boolean>
}