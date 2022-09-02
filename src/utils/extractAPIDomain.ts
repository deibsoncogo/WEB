export const extractAPIDomain = (url?: string): string => {
  if (!url) {
    return ''
  }
  const [_, __, domain] = url.split('/')
  return domain
}
