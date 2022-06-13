import { RoomsTable } from "../../../../layout/components/tables/rooms-list"
import { makeRemoteDeleteRoom } from "../../usecases/room/remote-deleteCourse-factory"
import { makeRemoteGetRoom } from "../../usecases/room/remote-getRoom-factory"

export const MakeCourseTable = () => {
    return <RoomsTable deleteRoom = {makeRemoteDeleteRoom()} getRoom = {makeRemoteGetRoom()}/>
  }
  