import { CreateCourse } from "../../../models/createCourse";

export interface CourseC {
    files: FormData
    create: CreateCourse
}

export interface ICreateCourse {
    create:(createCourse: FormData) => Promise<boolean>
}