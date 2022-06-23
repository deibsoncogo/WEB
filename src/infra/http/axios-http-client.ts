import { HttpRequest, HttpResponse, HttpClient } from '../../data/protocols/http-client'
import axios, { AxiosRequestHeaders, AxiosResponse, HeadersDefaults } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: this.getAuthHeaders(data.headers),
        params: data.params,
        responseType: data.responseType,
      })
    } catch (error: any) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse?.data?.data || axiosResponse?.data,
      response: axiosResponse,
    }
  }
  //'content-type': 'multipart/form-data'

  getAuthHeaders(currentHeaders = {}): AxiosRequestHeaders {
    // return authorization header with basic auth credentials
    let token = localStorage.getItem('access_token')
    const headers = { ...currentHeaders } as any

    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    return headers
  }
}
