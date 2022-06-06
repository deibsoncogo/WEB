import { CourseClass } from "./courseClass";

export class CreateCourse{
    name: string;
    description: string;
    content: string;
    categoryId: string;
    discount: string;
    imageUrl: string;
    installments: string;
    isActive: boolean;
    price: string; 
    accessTime: string; 
    userId: string;
    courseClass: CourseClass[]

    constructor(name: string, description: string, content: string, categoryId: string,
        discount: string , imageUrl: string, installments: string, isActive: boolean,  price: string,  
        accessTime: string, userId: string, courseClass: CourseClass[])
    {
        this.name = name;
        this.description = description;
        this.content = content;
        this.categoryId = categoryId;
        this.discount = discount;
        this.imageUrl = imageUrl;
        this.installments = installments;
        this.isActive = isActive;
        this.price = price;
        this.accessTime = accessTime;
        this.userId = userId;   
        this.courseClass = courseClass        
        
        
    }
}