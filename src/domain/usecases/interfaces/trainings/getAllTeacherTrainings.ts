import { ITraining } from "../../../models/training";
import { InputPagination } from "../../../shared/interface/InputPagination";
import { OutputPagination } from "../../../shared/interface/OutputPagination";


export interface GetTrainingParams extends InputPagination {
  name?: string,
}

export interface IGetAllTeacherTrainings {
  getAll:(params: GetTrainingParams, userId: string ) => Promise<OutputPagination<ITraining>>
}
