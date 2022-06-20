import { IRoomResponse } from "../../../../interfaces/api-response/roomResponse";


export interface IGetRoom{
    get:(id: string) => Promise<IRoomResponse>
}

