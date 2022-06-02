import { CreateCourse } from "../../../models/createCourse";


export interface ICreateCourse {
    create:(createCourse: CreateCourse) => Promise<boolean>
}