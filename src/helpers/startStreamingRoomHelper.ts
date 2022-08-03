import { IStreamingRoom } from "../domain/models/streamingRoom"
import { getIsoDateToBRL } from "../layout/templates/trainings/utils/getIsoDateToBRL"

export const startStreamingRoomHelper = (streamings: IStreamingRoom[]): IStreamingRoom[] => {
    return streamings.map((streaming) => {    
      return {
        ...streaming,
        dateISO: streaming.date,
        date: getIsoDateToBRL(streaming.date),
      }
    })   
}
