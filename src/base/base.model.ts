import { EResponseCode } from '@/configs/response-code.enum';

export type THttpResponse<T> = {
  code: EResponseCode;
  data: T;
  message: string;
};

export type TContextAction<T, P = any> = {
  type: T;
  payload?: P;
};

export type TUploadImageResult = {
  id: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
};

export type TPaginatedInput = {
  limit?: number;
  page?: number;
};

export type TPaginatedResult<T> = {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};
