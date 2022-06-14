import { FormHandles } from '@unform/core'
import { RefObject } from 'react'
import { IStreaming } from '../../../../domain/models/streaming'
import { formatDate, formatTime } from '../../../../helpers'

export function getStreamingDate(formRef: RefObject<FormHandles>): IStreaming | undefined {
  const streamingDate = formatDate(formRef.current?.getData().streamingDate, 'DD/MM/YYYY')
  const streamingHour = formatTime(formRef.current?.getData().streamingHour, 'HH:mm')

  if (streamingDate === 'Invalid date') {
    formRef.current?.setFieldError('streamingDate', 'Data da transmissão é obrigatório')
  }

  if (streamingHour === 'Invalid date') {
    formRef.current?.setFieldError('streamingHour', 'Hora da transmissão é obrigatório')
  }

  const isInvalidDate = [streamingDate, streamingHour].includes('Invalid date')
  if (isInvalidDate) {
    return
  }

  formRef.current?.clearField('streamingDate')
  formRef.current?.clearField('streamingHour')

  const streaming = {
    date: streamingDate,
    hour: streamingHour,
    dateISO: formatDate(formRef.current?.getData().streamingDate, 'YYYY-MM-DD'),
    start: false,
  }

  return streaming
}
