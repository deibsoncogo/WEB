export class CreateCourse{
    name: string;
    description: string;
    content: string;
    categoryId: string;
    discount?: number;
    image: string;
    installments: number;
    isActive: boolean;
    price?: number; 
    accessTime: number; 
    userId: string;

    constructor(name: string, description: string, content: string, categoryId: string,
        discount: number | undefined, image: string, installments: number, isActive: boolean,  price: number | undefined,  
        accessTime: number, userId: string)
    {
        this.name = name;
        this.description = description;
        this.content = content;
        this.categoryId = categoryId;
        this.discount = discount;
        this.image = image;
        this.installments = installments;
        this.isActive = isActive;
        this.price = price;
        this.accessTime = accessTime;
        this.userId = userId;           
        
        
    }
}