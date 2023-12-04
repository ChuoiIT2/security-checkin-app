import axios from 'axios';
import Cookies from 'js-cookie';

import { THttpResponse } from '@/base/base.model';
import { httpService } from '@/base/http-service';
import {
  ACCESS_TOKEN_KEY,
  API_BASE_URL,
  REFRESH_TOKEN_KEY,
} from '@/configs/constant.config';

import {
  TLoginDto,
  TLoginResult,
  TRefreshTokenResult,
  TUserDto,
} from './auth.model';

class AuthService {
  async login(input: TLoginDto) {
    const response = await axios.post<THttpResponse<TLoginResult>>(
      `${API_BASE_URL}/auth/login`,
      input,
    );

    const data = response.data.data;

    Cookies.set(ACCESS_TOKEN_KEY, data.accessToken);
    Cookies.set(REFRESH_TOKEN_KEY, data.refreshToken);

    return this.getUserInfo();
  }

  async getUserInfo() {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const response = await httpService.request<THttpResponse<TUserDto>>({
      url: '/users/get-me',
      method: 'GET',
    });

    return response.data;
  }

  async refreshToken() {
    try {
      const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

      if (!refreshToken) {
        return false;
      }

      const response = await axios.post<THttpResponse<TRefreshTokenResult>>(
        `${API_BASE_URL}/auth/refresh-token`,
        null,
        { params: { refreshToken } },
      );

      const data = response.data.data;

      Cookies.set('accessToken', data.accessToken);

      return true;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  }
}

const authService = new AuthService();

export default authService;
