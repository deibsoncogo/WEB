export function validateStringWithNumber(text: string | undefined) {
  let match = /\d/.test(text as string)
  return !match
}
