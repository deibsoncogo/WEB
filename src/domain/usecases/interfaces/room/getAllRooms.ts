import { apiPaginationResponse } from "../../../../interfaces/api-response/apiPaginationResponse";
import { IRoomPartialResponse } from "../../../../interfaces/api-response/roomPartialResponse";
import { IRoomResponse } from "../../../../interfaces/api-response/roomResponse";



export interface GetRoomParams{
    name: string    
    take: number
    page: number
    order: 'asc' | 'desc' | undefined
  }

export interface IGetAllRooms {
    getAll:(params: GetRoomParams ) => Promise<apiPaginationResponse<IRoomPartialResponse>>
}

