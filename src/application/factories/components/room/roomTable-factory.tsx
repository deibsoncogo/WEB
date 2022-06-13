import { RoomsTable } from "../../../../layout/components/tables/rooms-list"
import { makeRemoteDeleteRoom } from "../../usecases/room/remote-deleteCourse-factory"
import { makeRemoteGetRoom } from "../../usecases/room/remote-getRoom-factory"
import { makeRemoteUpdateRoom } from "../../usecases/room/remote-updateRoom-factory"

export const MakeCourseTable = () => {
    return <RoomsTable getRoom = {makeRemoteGetRoom()} updateRoom = {makeRemoteUpdateRoom()}  deleteRoom = {makeRemoteDeleteRoom()}/>
  }
  