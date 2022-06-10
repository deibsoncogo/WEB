import { UpdateCourse } from "../../../models/updateCourse";


export interface IUpdateCourse {
    update:(updateCourse: FormData) => Promise<boolean>
}