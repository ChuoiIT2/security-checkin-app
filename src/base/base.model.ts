import { EResponseCode } from '@/configs/response-code.enum';

export interface IHttpResponse<T> {
  code: EResponseCode;
  data: T;
  message: string;
}

export interface IContextAction<T, P = any> {
  type: T;
  payload?: P;
}
