import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type ResponseType,
} from 'axios';

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

    try {
      const response = await axios.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
  }
}
