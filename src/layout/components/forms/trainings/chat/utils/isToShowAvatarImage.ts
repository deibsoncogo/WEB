import { IChatTraining } from '../../../../../../domain/models/createChatTraining'

export const isToShowAvatarImage = (index: number, messages: IChatTraining[]) => {
  if (messages?.length > 1 && index >= 1) {
    return messages.length === index - 1 ? true : messages[index].date !== messages[index + 1]?.date
  }
  return messages?.length == 1
}
