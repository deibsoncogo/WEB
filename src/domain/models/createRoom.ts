

export class CreateRoom{
    name: string;
    description: string;    
    discount: string; 
    installments: string;
    isActive: boolean;
    price: string; 
    userId: string;
    categoryId: string;


    constructor(name: string, description: string, discount: string, installments: string,
         isActive: boolean,  price: string, userId: string, categoryId: string)
    {
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