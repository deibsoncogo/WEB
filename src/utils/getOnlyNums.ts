export const getOnlyNums = (value: string) => {
  return value.replace(/[^\d]/g, '')
}
