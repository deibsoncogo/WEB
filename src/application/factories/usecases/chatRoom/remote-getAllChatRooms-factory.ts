import { makeApiUrl } from './../../http/apiUrl-factory';
import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { RemoteGetAllChatRooms } from "../../../../data/usecases/chatRoom/remote-getAllChatRooms";
import { IGetAllChatRooms } from "../../../../domain/usecases/interfaces/chatRoom/getAllChatRooms";


export const makeRemoteGetAllChatRooms = (): IGetAllChatRooms =>
  new RemoteGetAllChatRooms(makeApiUrl('/chatRoom'), makeAxiosHttpClient());
