import { RoomsTable } from '../../../../layout/components/tables/rooms-list'
import { makeRemoteDeleteRoom } from '../../usecases/room/remote-deleteCourse-factory'
import { makeRemoteGetAllRooms } from '../../usecases/room/remote-getAllRooms-factory'
import { makeRemoteToggleRoomStatus } from '../../usecases/room/remote-toggleRoomStatus-factory'

export const MakeRoomTable = () => {
  return (
    <RoomsTable
      getAllRooms={makeRemoteGetAllRooms()}
      toggleStatus={makeRemoteToggleRoomStatus()}
      deleteRoom={makeRemoteDeleteRoom()}
    />
  )
}
