import { NotificationTable } from "../../../../layout/components/tables/notification-list"
import { makeRemoteGetAllNotifiation } from "../../usecases/notification/remote-getAllFreeContent-factory"
import { makeRemoteJoinNotification } from "../../usecases/notification/remote-joinNotification-factory"
import { makeRemoteToggleNotificationStatus } from "../../usecases/notification/remote-toggleNotificationStatus-factory"

export const MakeNotificationTable = () => {
  return (
    <NotificationTable
      getAllNotification={makeRemoteGetAllNotifiation()}
      toggleStatus={makeRemoteToggleNotificationStatus()}
      joinNotification={makeRemoteJoinNotification()}
    />
  )
}
