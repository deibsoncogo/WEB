export const extractAPIURL = (url?: string): string => {
  if (!url) {
    return ''
  }
  const [protocol, _, domain] = url.split('/')
  return `${protocol}//${domain}`
}
