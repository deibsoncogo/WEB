import { FormHandles } from '@unform/core'
import { RefObject } from 'react'
import { IStreaming } from '../../../../domain/models/streaming'
import { formatDate, formatTime } from '../../../../helpers'

export function getStreamingDate(formRef: RefObject<FormHandles>): IStreaming | undefined {
  const streamingDate = formRef.current?.getData().streamingDate
  const streamingHour = formRef.current?.getData().streamingHour

  if (!streamingDate) {
    formRef.current?.setFieldError('streamingDate', 'Data da transmissão é obrigatório')
  }

  if (!streamingHour) {
    formRef.current?.setFieldError('streamingHour', 'Hora da transmissão é obrigatório')
  }

  if (!streamingDate || !streamingHour) {
    return
  }

  formRef.current?.clearField('streamingDate')
  formRef.current?.clearField('streamingHour')

  const formattedStreamingDate = formatDate(streamingDate, 'DD/MM/YYYY')
  const formattedStreamingHour = formatTime(streamingHour, 'HH:mm')

  const streaming = {
    date: formattedStreamingDate,
    hour: formattedStreamingHour,
    dateISO: formatDate(formRef.current?.getData().streamingDate, 'YYYY-MM-DD'),
    start: false,
  }

  return streaming
}
