import { makeAxiosHttpClient } from '../../http/axiosHttpClient-factory';
import { makeApiUrl } from "../../http";
import { IGetAllPlans } from '../../../../domain/usecases/interfaces/plans/getAllPlans';
import { RemoteGetNotRelatedPlans } from '../../../../data/usecases/plan/remote-getNotRelatedPlans';
import { IGetNotRelatedPlans } from '../../../../domain/usecases/interfaces/plan/getNotRelatedPlans';

export const makeRemoteGetNotRelatedPlans = (): IGetNotRelatedPlans =>
  new RemoteGetNotRelatedPlans(makeApiUrl('/plans/notRelatedPlans'), makeAxiosHttpClient());
