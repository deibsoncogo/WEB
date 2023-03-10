import { IStreaming } from "./streaming";
import { IStreamingRoom } from "./streamingRoom";


export class CreateRoom{
    name: string;
    description: string;    
    discount: string; 
    installments: string;
    isActive: boolean;
    isChatActive: boolean;
    isStreamingRoomActive: boolean;
    price: string; 
    userId: string;   
    level: string;   
    zoomUserId?: string
    zoomUserName?: string
    streamingRooms?: IStreamingRoom[]


    constructor(name: string, description: string, discount: string, installments: string,
         isActive: boolean, isChatActive: boolean, isStreamingRoomActive: boolean,  price: string, userId: string, level: string, zoomUserId?: string, zoomUserName?: string, streamings?: IStreamingRoom[])
    {
        this.name = name;
        this.description = description;        
        this.discount = discount;
        this.installments = installments;
        this.isActive = isActive;
        this.isChatActive = isChatActive;
        this.isStreamingRoomActive = isStreamingRoomActive;
        this.price = price;
        this.userId = userId;   
        this.level = level;   
        this.zoomUserId = zoomUserId;
        this.zoomUserName = zoomUserName;
        this.streamingRooms = streamings;  
          
    }
}