import { RoomsTable } from "../../../../layout/components/tables/rooms-list"
import { makeRemoteDeleteRoom } from "../../usecases/room/remote-deleteCourse-factory"

export const MakeCourseTable = () => {
    return <RoomsTable deleteRoom = {makeRemoteDeleteRoom()}/>
  }
  