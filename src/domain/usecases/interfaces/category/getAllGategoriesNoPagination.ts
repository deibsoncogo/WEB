import { ICategory } from "../../../../interfaces/api-response/categoryResponse";

export interface IGetCategoriesNoPagination {
    get: () => Promise<ICategory[]>
  }
  