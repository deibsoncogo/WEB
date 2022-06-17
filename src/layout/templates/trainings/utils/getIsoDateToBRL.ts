export function getIsoDateToBRL(date: string) {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}
