import { IFreeContentResponse } from "../../../../interfaces/api-response/freeContentResponse";

export interface IGetFreeContent{
    get:(id: string) => Promise<IFreeContentResponse>
}

