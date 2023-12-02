import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import Cookies from 'js-cookie';

import {
  ACCESS_TOKEN_KEY,
  AUTH_API_ENDPOINT,
  NO_AUTH_API_ENDPOINT,
  TENANT_ID_KEY,
} from '@/configs/constant.config';
import authService from '@/services/auth/auth.service';

interface IHttpRequest {
  url: string;
  method: Method;
  data?: any;
  params?: any;
  contentType?: string;
}

class HttpService {
  private readonly http: AxiosInstance;
  private readonly httpNoAuth: AxiosInstance;
  private readonly httpLogout: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: AUTH_API_ENDPOINT,
      timeout: 30000,
    });

    this.httpNoAuth = axios.create({
      baseURL: NO_AUTH_API_ENDPOINT,
      timeout: 30000,
    });

    this.httpLogout = axios.create({
      baseURL: NO_AUTH_API_ENDPOINT,
      timeout: 30000,
    });

    this.http.interceptors.request.use(
      async (config) => {
        const headers: any = config.headers;
        const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
        const tenantId = Cookies.get(TENANT_ID_KEY);

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }
        if (tenantId) {
          headers['Abp.TenantId'] = tenantId;
        }

        return { ...config, headers: config.headers };
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.http.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

        if (!accessToken) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401) {
          const success = await authService.refreshToken();

          if (success) {
            return this.http(error.config as AxiosRequestConfig);
          } else {
            await authService.logout();
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );

    this.httpLogout.interceptors.request.use(
      async (config) => {
        const headers: any = config.headers;
        const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
        const tenantId = Cookies.get(TENANT_ID_KEY);

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }
        if (tenantId) {
          headers['Abp.TenantId'] = tenantId;
        }

        return { ...config, headers: config.headers };
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async request<T>({
    url,
    params,
    data,
    method,
    contentType,
  }: IHttpRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      headers: {
        'Content-Type': contentType || 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const response = await this.http.request(config);

    return response.data as T;
  }

  async requestNoAuth<T>({
    url,
    params,
    data,
    method,
    contentType,
  }: IHttpRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      headers: {
        'Content-Type': contentType || 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const response = await this.httpNoAuth.request(config);

    return response.data as T;
  }

  async requestLogout<T>({
    url,
    params,
    data,
    method,
    contentType,
  }: IHttpRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      headers: {
        'Content-Type': contentType || 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const response = await this.httpLogout.request(config);

    return response.data as T;
  }
}

const httpService = new HttpService();

export default httpService;
