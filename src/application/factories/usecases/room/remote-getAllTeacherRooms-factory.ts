import { makeApiUrl, makeAxiosHttpClient } from "../../http";
import { IGetAllTeacherRooms } from "../../../../domain/usecases/interfaces/room/getAllTeacherRooms";
import { RemoteGetAllTeacherRooms } from "../../../../data/usecases/room/remote-getAllTeacherRooms";

export const makeRemoteGetAllTeacherRooms = (): IGetAllTeacherRooms => {
  return new RemoteGetAllTeacherRooms(makeApiUrl('room'), makeAxiosHttpClient());
}
