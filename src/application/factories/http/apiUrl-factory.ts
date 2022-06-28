// @ts-ignore

export const makeApiUrl = (path: string): string => `${process.env.API_URL?.replace(/[\/\\]$/, '')}/${path.replace(/^[\/\\]/, '')}`;