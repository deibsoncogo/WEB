import { RoomsTable } from '../../../../layout/components/tables/rooms-list'
import { makeRemoteDeleteRoom } from '../../usecases/room/remote-deleteCourse-factory'
import { makeRemoteGetAllRooms } from '../../usecases/room/remote-getAllRooms-factory'
import { makeRemoteGetAllTeacherRooms } from '../../usecases/room/remote-getAllTeacherRooms-factory'
import { makeRemoteToggleRoomStatus } from '../../usecases/room/remote-toggleRoomStatus-factory'

export const MakeRoomTable = () => {
  return (
    <RoomsTable
      getAllRooms={makeRemoteGetAllRooms()}
      getAllTeacherRooms={makeRemoteGetAllTeacherRooms()}
      toggleStatus={makeRemoteToggleRoomStatus()}
      deleteRoom={makeRemoteDeleteRoom()}
    />
  )
}
