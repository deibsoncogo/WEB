import { IStreaming } from '../../../../domain/models/streaming'
import { ITraining } from '../../../../domain/models/training'
import { formatDate } from '../../../../helpers'
import { onlyNums } from '../../../formatters/currenceFormatter'

function formatTrainingToSubmit(training: ITraining, streamingList: IStreaming[]): FormData {
  const formattedStreamings = streamingList.map((stream) => ({
    hour: stream.hour,
    date: stream.dateISO,
    dateISO: stream.dateISO,
    id: stream.id,
  }))

  const formattedData: ITraining = {
    ...training,
    price: Number(onlyNums(training.price)),
    discount: Number(onlyNums(training.discount)),
    streamings: formattedStreamings,
    trainingEndDate: formatDate(new Date(training.trainingEndDate), 'YYYY-MM-DD'),
    deactiveChatDate: formatDate(new Date(training.deactiveChatDate), 'YYYY-MM-DD'),
  }
  const {
    categoryId,
    description,
    discount,
    name,
    price,
    streamings,
    teacherId,
    image,
    trainingEndDate,
    deactiveChatDate,
    installments,
    zoomUserId,
  } = formattedData

  const formData = new FormData()

  formData.append('image', image)
  formData.append('price', String(price))
  formData.append('discount', String(discount))
  formData.append('teacherId', String(teacherId))
  formData.append('categoryId', String(categoryId))
  formData.append('name', String(name))
  formData.append('description', String(description))
  formData.append('installments', String(installments))
  formData.append('active', String(false))
  formData.append('trainingEndDate', String(trainingEndDate))
  formData.append('deactiveChatDate', String(deactiveChatDate))
  formData.append('zoomUserId', String(zoomUserId))
  const streamingsString = JSON.stringify(streamings)
  formData.append('streamings', streamingsString)

  return formData
}

export { formatTrainingToSubmit }
