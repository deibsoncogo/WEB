import { IChatRoom } from '../../../../../../domain/models/createChatRoom'

export const IsPreviousDateDifferentFromCurrent = (index: number, messages: IChatRoom[]) => {
  if (messages?.length > 1 && index >= 1) {
    return messages[index - 1].date !== messages[index]?.date
  }
  return true
}
