import { ICreateChatTraining } from './../../../../domain/usecases/interfaces/chatTraining/createTraining';
import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { makeApiUrl } from "../../http";
import { RemoteCreateChatTraining } from '../../../../data/usecases/chatTraining/remote-createChatTraining';

export const makeRemoteCreateChatTraining = (): ICreateChatTraining =>
     new RemoteCreateChatTraining(makeApiUrl('/chatTraining'), makeAxiosHttpClient());