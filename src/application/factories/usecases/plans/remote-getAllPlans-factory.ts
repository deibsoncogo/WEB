import { makeAxiosHttpClient } from '../../http/axiosHttpClient-factory';
import { makeApiUrl } from "../../http";
import { RemoteGetAllPlans } from '../../../../data/usecases/plans/remote-getAllPlans';
import { IGetAllPlans } from '../../../../domain/usecases/interfaces/plans/getAllPlans';

export const makeRemoteGetAllPlans = (): IGetAllPlans =>
  new RemoteGetAllPlans(makeApiUrl('/plans'), makeAxiosHttpClient());
