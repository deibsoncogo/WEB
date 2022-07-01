import { RemoteGetAllChatTraining } from './../../../../data/usecases/chatTraining/remote-getAllChatTraining';
import { IGetAllChatTraining } from './../../../../domain/usecases/interfaces/chatTraining/getAllChatRooms';
import { makeApiUrl } from './../../http/apiUrl-factory';
import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';


export const makeRemoteGetAllChatTraining = (): IGetAllChatTraining =>
  new RemoteGetAllChatTraining(makeApiUrl('/chatTraining'), makeAxiosHttpClient());
