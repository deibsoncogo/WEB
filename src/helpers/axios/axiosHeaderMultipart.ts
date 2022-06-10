import { AxiosRequestHeaders } from "axios"

export const getAuthHeadersMultipart =  (): AxiosRequestHeaders => { 
    // return authorization header with basic auth credentials
    let token = localStorage.getItem('access_token')
    if (token) {
      return { authorization: `Bearer ${token}`, 'content-type': 'multipart/form-data'}
    } else {
      return {}
    }
  }