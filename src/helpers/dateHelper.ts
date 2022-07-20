import moment from 'moment'

export function rangeInt(start: number, end: number): number[] {
  const arrNumbers = []
  for (let i = start; i < end; i++) {
    arrNumbers.push(i)
  }
  return arrNumbers
}

export function formatDate(date: Date | string, format: string): string {
  const newDate = moment(date).format(format)
  return newDate
}

export function formatTime(time: Date, format: string): string {
  const newDate = moment(time).format(format)
  return newDate
}

export function formatDateToUTC(date: string) {
  const formattedDate = new Date(date)
  const day = formattedDate.getUTCDate()
  const month = formattedDate.getUTCMonth()
  const year = formattedDate.getUTCFullYear()
  return new Date(year, month, day)
}
