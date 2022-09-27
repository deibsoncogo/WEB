import moment from 'moment'

export function rangeInt(start: number, end: number): number[] {
  const arrNumbers = []
  for (let i = start; i < end; i++) {
    arrNumbers.push(i)
  }
  return arrNumbers
}

export function formatDate(date: Date | string, format: string): string {
  if (date instanceof Date) {
    date.setTime(date.getTime() + 1000 * 60 * 60 * 3)
  }

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


export function ParseDate(input: string): Date {
  const [day, month, year] = input.split('/')
  const returnDate = new Date()
  returnDate.setDate(parseInt(day))
  returnDate.setMonth(parseInt(month) - 1)
  returnDate.setFullYear(parseInt(year))
  return returnDate
}
