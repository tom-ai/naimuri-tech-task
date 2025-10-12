import axios, { type AxiosRequestConfig } from 'axios';

export class Api {
  protected static async get<T>(
url: string,
    responseType: ResponseType = 'json',
    mediaType?: 'raw'
) {
    const config: AxiosRequestConfig = {
      baseURL: 'https://api.github.com',
responseType,
      headers:
        mediaType === 'raw'
          ? {
              Accept: 'application/vnd.github.raw+json',
            }
          : undefined,
    };

    const response = await axios.get<T>(url, config);

    if (response.status !== 200) return undefined;
    else return response.data;
  }
}
