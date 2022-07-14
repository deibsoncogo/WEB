import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { RemoteCreateChatRoom } from "../../../../data/usecases/chatRoom/remote-createChatRoom";
import { ICreateChatRoom } from "../../../../domain/usecases/interfaces/chatRoom/createRoom";
import { makeApiUrl } from "../../http";

export const makeRemoteCreateChatRoom = (): ICreateChatRoom =>
     new RemoteCreateChatRoom(makeApiUrl('/chatRoom'), makeAxiosHttpClient());