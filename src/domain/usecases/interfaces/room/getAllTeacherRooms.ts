import { IRoomPartialResponse } from "../../../../interfaces/api-response/roomPartialResponse";
import { InputPagination } from "../../../shared/interface/InputPagination";
import { OutputPagination } from "../../../shared/interface/OutputPagination";


export interface GetRoomParams extends InputPagination {
  name?: string,
}

export interface IGetAllTeacherRooms {
  getAll:(params: GetRoomParams, userId: string ) => Promise<OutputPagination<IRoomPartialResponse>>
}
