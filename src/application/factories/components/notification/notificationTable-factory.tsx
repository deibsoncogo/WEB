import { NotificationTable } from "../../../../layout/components/tables/notification-list"
import { makeRemoteCreateNotification } from "../../usecases/notification/remote-createNotification-factory"
import { makeRemoteDeleteNotification } from "../../usecases/notification/remote-deleteFreeContent-factory"
import { makeRemoteGetAllNotifiation } from "../../usecases/notification/remote-getAllFreeContent-factory"
import { makeRemoteToggleNotificationStatus } from "../../usecases/notification/remote-toggleNotificationStatus-factory"

export const MakeNotificationTable = () => {
  return (
    <NotificationTable
      createNotification={makeRemoteCreateNotification()}
      getAllNotification={makeRemoteGetAllNotifiation()}
      toggleStatus={makeRemoteToggleNotificationStatus()}
      deleteNotification={makeRemoteDeleteNotification()}  

    />
  )
}
