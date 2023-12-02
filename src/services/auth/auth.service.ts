import Cookies from 'js-cookie';

import { IHttpResponse } from '@/base/base.model';
import httpService from '@/base/http-service';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TENANT_ID_KEY,
} from '@/configs/constant.config';

import {
  IIsTenantAvailableResponse,
  ILoginPayload,
  ILoginResponse,
  IRefreshTokenResponse,
  IRegisterPayload,
  IRegisterResponse,
  IUserInfo,
} from './auth.model';

class AuthService {
  async login(loginPayload: ILoginPayload) {
    const response = await httpService.requestNoAuth<
      IHttpResponse<ILoginResponse>
    >({
      url: '/api/auth/login',
      method: 'POST',
      data: loginPayload,
    });

    Cookies.set(ACCESS_TOKEN_KEY, response.data.accessToken);
    Cookies.set(REFRESH_TOKEN_KEY, response.data.refreshToken);

    return this.getUserInfo();
  }

  async register(registerPayload: IRegisterPayload) {
    const response = await httpService.requestNoAuth<
      IHttpResponse<IRegisterResponse>
    >({
      url: '/api/auth/register',
      method: 'POST',
      data: registerPayload,
    });

    Cookies.set(ACCESS_TOKEN_KEY, response.data.accessToken);
    Cookies.set(REFRESH_TOKEN_KEY, response.data.refreshToken);

    return this.getUserInfo();
  }

  async logout() {
    const response = await httpService.requestLogout<IHttpResponse<boolean>>({
      url: '/api/auth/logout',
      method: 'POST',
    });
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    Cookies.remove(TENANT_ID_KEY);

    return response.data;
  }

  async refreshToken() {
    try {
      const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

      if (!refreshToken) {
        return false;
      }

      const response = await httpService.requestNoAuth<
        IHttpResponse<IRefreshTokenResponse>
      >({
        url: '/api/auth/refresh-token',
        method: 'GET',
        params: {
          refreshToken,
        },
      });

      Cookies.set(ACCESS_TOKEN_KEY, response.data.accessToken);

      return true;
    } catch (error) {
      return false;
    }
  }

  async getUserInfo() {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      throw new Error('Access token is not found');
    }

    const response = await httpService.request<IHttpResponse<IUserInfo>>({
      url: '/api/users/my-info',
      method: 'GET',
    });

    return response.data;
  }

  async isTenantAvailable({ tenancyName }: { tenancyName?: string }) {
    const response = await httpService.requestNoAuth<
      IHttpResponse<IIsTenantAvailableResponse>
    >({
      url: '/api/auth/is-tenant-available',
      method: 'POST',
      data: {
        tenancyName,
      },
    });

    return response.data;
  }
}

const authService = new AuthService();

export default authService;
