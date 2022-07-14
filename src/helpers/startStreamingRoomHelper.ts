import { IStreamingRoom } from "../domain/models/streamingRoom"
import { getIsoDateToBRL } from "../layout/templates/trainings/utils/getIsoDateToBRL"

export const startStreamingRoomHelper = (streamings: IStreamingRoom[]): IStreamingRoom[] => {
    return streamings.map((streaming) => {
      const date = new Date(`${streaming.date}:${streaming.hour}`)
      const dateNow = new Date()

      const timeLeft = (date.getTime() - dateNow.getTime()) / 1000 / 60
      const minutesToStart = 40
      const isToShowStartUrl = timeLeft < minutesToStart

      return {
        ...streaming,
        dateISO: streaming.date,
        date: getIsoDateToBRL(streaming.date),
        showStartLink: isToShowStartUrl,
      }
    })

   
  }
