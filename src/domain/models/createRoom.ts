import { IStreaming } from "./streaming";
import { IStreamingRoom } from "./streamingRoom";


export class CreateRoom{
    name: string;
    description: string;    
    discount: string; 
    installments: string;
    isActive: boolean;
    isChatActive: boolean;
    price: string; 
    userId: string;
    categoryId: string;    
    streamingsRoom?: IStreamingRoom[]


    constructor(name: string, description: string, discount: string, installments: string,
         isActive: boolean, isChatActive: boolean,  price: string, userId: string, categoryId: string, streamings?: IStreamingRoom[])
    {
        this.name = name;
        this.description = description;        
        this.discount = discount;
        this.installments = installments;
        this.isActive = isActive;
        this.isChatActive = isChatActive;
        this.price = price;
        this.userId = userId;   
        this.categoryId = categoryId;   
        this.streamingsRoom = streamings;  
          
    }
}