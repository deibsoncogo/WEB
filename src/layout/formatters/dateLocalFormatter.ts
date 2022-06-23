import { formatDateToUTC } from '../../helpers'

export function DateLocalFullInformationMask(date: string) {
  if (!date) {
    return ''
  }

  return new Date(formatDateToUTC(date)).toLocaleDateString('pt-br', {
    year: 'numeric',
    month: 'long' || 'short' || 'numeric',
    day: 'numeric',
  })
}
