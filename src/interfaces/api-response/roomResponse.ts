import { IStreamingRoom } from "../../domain/models/streamingRoom";

export interface IRoomResponse{
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string; 
    installments: string;
    discount: string;
    isActive: boolean;
    isChatActive: boolean;
    isStreamingRoomActive: boolean;
    userId: string;    
    categoryId: string;
    teacherName: string;
    categoryName: string;
    streamingRooms: IStreamingRoom[]
}