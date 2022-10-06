import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import { MessageType } from '../../../../../../domain/models/messageType'
import { formatDate, formatTime } from '../../../../../../helpers'

type IHandleUploadFileParams = {
  uploadFile: (form: FormData) => Promise<void>
  event: ChangeEvent<HTMLInputElement>
  trainingId: string
}

export function handleUploadFile({ event, uploadFile, trainingId }: IHandleUploadFileParams) {
  const file = event.target?.files?.[0]
  if (!file) {
    return
  }
  const [fileType] = file?.type.split('/')

  if (fileType === 'video') {
    toast.error('Não é permitido fazer o upload de vídeos')
    return
  }

  const currentDateMessage = new Date()

  const formData = new FormData()

  formData.append('trainingId', String(trainingId))
  formData.append('date', formatDate(currentDateMessage, 'YYYY-MM-DD'))
  formData.append('hour', formatTime(currentDateMessage, 'HH:mm:ss'))
  formData.append('fileType', fileType)
  formData.append('messageType', MessageType.File)
  formData.append('image', file)
  uploadFile(formData)
}
