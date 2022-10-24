import { IZoomUser } from "../domain/usecases/interfaces/zoom/getZoomUsers";

export function getZoomUserName(zoomUsers: IZoomUser[], zoomUserId: string) {
    const zoomUser = zoomUsers?.find(user => user.id === zoomUserId)
    return `${zoomUser?.first_name} ${zoomUser?.last_name}`
}