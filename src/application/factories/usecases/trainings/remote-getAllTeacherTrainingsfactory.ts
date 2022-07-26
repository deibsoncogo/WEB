import { makeApiUrl, makeAxiosHttpClient } from "../../http";
import { IGetAllTeacherTrainings } from "../../../../domain/usecases/interfaces/trainings/getAllTeacherTrainings";
import { RemoteGetAllTeacherTrainings } from "../../../../data/usecases/training/remote-getAllTeacherTrainings";

export const makeRemoteGetAllTeacherTrainings = (): IGetAllTeacherTrainings => {
  return new RemoteGetAllTeacherTrainings(makeApiUrl('training'), makeAxiosHttpClient());
}
