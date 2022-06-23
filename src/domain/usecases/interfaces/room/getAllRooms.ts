import { IRoomPartialResponse } from "../../../../interfaces/api-response/roomPartialResponse";
import { IRoom } from "../../../models/room";
import { InputPagination } from "../../../shared/interface/InputPagination";
import { OutputPagination } from "../../../shared/interface/OutputPagination";


export interface GetRoomParams extends InputPagination {
  name?: string  
}

export interface IGetAllRooms {
  getAll:(params: GetRoomParams ) => Promise<OutputPagination<IRoomPartialResponse>>
}
