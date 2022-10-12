import { NotificationTable } from "../../../../layout/components/tables/notification-list"
import { makeRemoteCreateNotification } from "../../usecases/notification/remote-createNotification-factory"
import { makeRemoteDeleteNotification } from "../../usecases/notification/remote-deleteFreeContent-factory"
import { makeRemoteGetAllNotifiation } from "../../usecases/notification/remote-getAllFreeContent-factory"
import { makeRemoteJoinNotification } from "../../usecases/notification/remote-joinNotification-factory"
import { makeRemoteToggleNotificationStatus } from "../../usecases/notification/remote-toggleNotificationStatus-factory"
import { makeRemoteUpdateNotification } from "../../usecases/notification/remote-updateNotification-factory"

export const MakeNotificationTable = () => {
  return (
    <NotificationTable
      createNotification={makeRemoteCreateNotification()}
      updateNotification={makeRemoteUpdateNotification()}
      getAllNotification={makeRemoteGetAllNotifiation()}
      toggleStatus={makeRemoteToggleNotificationStatus()}
      deleteNotification={makeRemoteDeleteNotification()}  
      joinNotification={makeRemoteJoinNotification()}
    />
  )
}
