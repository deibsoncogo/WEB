import { IUserResponse } from "./userResponse";

export interface IPartialCourseResponse{
    id: string,
    name: string,
    description: string,
    price: string,   
    discount: string,   
    isActive: boolean,
    categoryId: string,
    teacherName: string   
}