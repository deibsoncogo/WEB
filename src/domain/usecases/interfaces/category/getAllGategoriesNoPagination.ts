import { ICategory } from "../../../../interfaces/api-response/categoryResponse";

export interface GetCategoriesNoPaginationParams {
  name: string;
}

export interface IGetCategoriesNoPagination {
    get: (params: GetCategoriesNoPaginationParams) => Promise<ICategory[]>
  }
  