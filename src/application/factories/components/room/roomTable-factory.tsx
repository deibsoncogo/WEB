import { RoomsTable } from "../../../../layout/components/tables/rooms-list"
import { makeRemoteDeleteRoom } from "../../usecases/room/remote-deleteCourse-factory"
import { makeRemoteGetAllRooms } from "../../usecases/room/remote-getAllRooms-factory"
import { makeRemoteGetRoom } from "../../usecases/room/remote-getRoom-factory"
import { makeRemoteUpdateRoom } from "../../usecases/room/remote-updateRoom-factory"

export const MakeRoomTable = () => {
    return <RoomsTable getAllRooms = {makeRemoteGetAllRooms()} updateRoom = {makeRemoteUpdateRoom()}  deleteRoom = {makeRemoteDeleteRoom()}/>
}
  