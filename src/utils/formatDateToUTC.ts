export function formatDateToUTC(date: string) {  
  const formattedDate = new Date(date)
  const day = formattedDate.getUTCDate()
  const month = formattedDate.getUTCMonth()
  const year = formattedDate.getUTCFullYear()
  return new Date(year, month, day)
}
