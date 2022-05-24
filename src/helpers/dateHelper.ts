import moment from 'moment'

export function rangeInt(start: number, end: number): number[] {
  const arrNumbers = []
  for (let i = start; i < end; i++) {
    arrNumbers.push(i)
  }
  return arrNumbers
}

export function formatDateToSend(date: Date): string {
  const newDate = moment(date).format('YYYY-DD-MM')
  return newDate
}
