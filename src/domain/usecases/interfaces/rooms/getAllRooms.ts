import { IRoom } from '../../../models/room'
import { InputPagination } from '../../../shared/interface/InputPagination'
import { OutputPagination } from '../../../shared/interface/OutputPagination'

export interface IGetAllRoomsParams extends InputPagination {
  name: string
}

export interface IGetAllRooms {
  getAll: (params: IGetAllRoomsParams) => Promise<OutputPagination<IRoom>>
}
