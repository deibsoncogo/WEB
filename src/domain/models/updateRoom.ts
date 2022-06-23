import { string } from "yup";


export class UpdateRoom{
    id: string;
    name: string;
    description: string;    
    discount: string; 
    installments: string;
    isActive: boolean;
    price: string; 
    userId: string;
    categoryId: string;


    constructor(id: string, name: string, description: string, discount: string, installments: string,
         isActive: boolean,  price: string, userId: string, categoryId: string)
    {
        this.id = id
        this.name = name;
        this.description = description;        
        this.discount = discount;
        this.installments = installments;
        this.isActive = isActive;
        this.price = price;
        this.userId = userId;   
        this.categoryId = categoryId;        
        
    }
}