import { CourseClass } from "./courseClass";

export class UpdateCourse{
    id?: string;
    name: string;
    description: string;
    content: string;
    categoryId: string;
    discount?: string;
    imageUrl?: string;
    installments: string;
    isActive?: boolean;
    price?: string;
    accessTime: string; 
    userId: string;
    courseClass: CourseClass[]

    constructor(id: string | undefined, name: string, description: string, content: string, categoryId: string,
        discount: string, imageUrl: string | undefined, installments: string, isActive: boolean | undefined,  price: string,  
        accessTime: string, userId: string, courseClass: CourseClass[])
    {
        this.id = id;
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