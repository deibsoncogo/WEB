import { string } from "yup";
import { IStreamingRoom } from "./streamingRoom";


export class UpdateRoom{
    id?: string;
    name: string;
    description: string;    
    discount: string; 
    installments: string;
    isActive: boolean;
    isChatActive: boolean;
    isStreamingRoomActive: boolean;
    price: string; 
    userId: string;
    categoryId: string;
    streamingRooms?: IStreamingRoom[]


    constructor(id: string | undefined, name: string, description: string, discount: string, installments: string,
        isActive: boolean, isChatActive: boolean, isStreamingRoomActive: boolean,  price: string, userId: string, categoryId: string, streamings?: IStreamingRoom[])
    {
        this.id = id;
        this.name = name;
        this.description = description;        
        this.discount = discount;
        this.installments = installments;
        this.isActive = isActive;
        this.isChatActive = isChatActive;
        this.isStreamingRoomActive = isStreamingRoomActive;
        this.price = price;
        this.userId = userId;   
        this.categoryId = categoryId;   
        this.streamingRooms = streamings;       
        
    }
}