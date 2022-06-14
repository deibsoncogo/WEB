import { apiPaginationResponse } from "../../../../interfaces/api-response/apiPaginationResponse";
import { IRoomPartialResponse } from "../../../../interfaces/api-response/roomPartialResponse";
import { IRoomResponse } from "../../../../interfaces/api-response/roomResponse";
import { InputPagination } from "../../../shared/interface/InputPagination";


export interface GetRoomParams extends InputPagination {
  name: string  
}

export interface IGetAllRooms {
    getAll:(params: GetRoomParams ) => Promise<apiPaginationResponse<IRoomPartialResponse>>
}

