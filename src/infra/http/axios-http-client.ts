

import axios, {AxiosRequestHeaders, AxiosResponse} from 'axios';
import { HttpClient, HttpRequest, HttpResponse } from '../../data/protocols';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers:  this.getAuthHeaders(),
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse?.data?.data || axiosResponse?.data,
    };
  }

  getAuthHeaders (): AxiosRequestHeaders {
    // return authorization header with basic auth credentials
    let token = localStorage.getItem("access_token");  
    if (token) {
        return { 'authorization': `Bearer ${token}`};
    } else {
        return {};
    }
  
  }
  

 
}

