import { NotificationTable } from "../../../../layout/components/tables/notification-list"
import { makeRemoteDeleteNotification } from "../../usecases/notification/remote-deleteFreeContent-factory"
import { makeRemoteGetAllNotifiation } from "../../usecases/notification/remote-getAllFreeContent-factory"

export const MakeNotificationTable = () => {
  return (
    <NotificationTable
      getAllNotification={makeRemoteGetAllNotifiation()}
      deleteNotification={makeRemoteDeleteNotification()}    
    />
  )
}
