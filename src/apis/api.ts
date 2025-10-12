import axios, { type AxiosRequestConfig } from 'axios';

export class Api {
  protected static async get<T>(url: string) {
    const config: AxiosRequestConfig = {
      baseURL: 'https://api.github.com',
    };

    const response = await axios.get<T>(url, config);

    if (response.status !== 200) return undefined;
    else return response.data;
  }
}
