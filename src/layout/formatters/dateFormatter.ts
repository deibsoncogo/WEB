export function dateMask(date: string) {
    if (!date) {
      return '';
    }
    return date.split("-").reverse().join("-").replaceAll('-', '/');
  }
  