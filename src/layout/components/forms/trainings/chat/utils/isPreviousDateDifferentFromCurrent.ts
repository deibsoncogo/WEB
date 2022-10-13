import { IChatTraining } from '../../../../../../domain/models/createChatTraining'

export const isPreviousDateDifferentFromCurrent = (index: number, messages: IChatTraining[]) => {
  if (messages?.length > 1 && index >= 1) {
    return messages[index - 1].date !== messages[index]?.date
  }
  return true
}
